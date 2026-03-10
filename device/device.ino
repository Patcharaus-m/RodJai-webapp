#include "soc/soc.h"
#include "soc/rtc_cntl_reg.h"
#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <PubSubClient.h>
#include <EEPROM.h>
#include <time.h>

// ================= CONFIG =================
const char* BACKUP_SSID = "RodjaiBackup";
const char* BACKUP_PASS = "rodjai12345678";
const char* DEVICE_SN = "test"; // << Serial Number ของอุปกรณ์

const char* mqtt_server = "2a0af9cc562347279c263a9df3d1f13f.s1.eu.hivemq.cloud";
const int mqtt_port = 8883;
const char* mqtt_username = "myesp32";
const char* mqtt_password = "Pcru2442007";

const char* ntpServer = "pool.ntp.org";
const long gmtOffset_sec = 7 * 3600; 

// ================= EEPROM =================
#define EEPROM_SIZE 256
#define SSID_ADDR   0     // 0-63   (64 bytes สำหรับ SSID)
#define PASS_ADDR   64    // 64-191 (128 bytes สำหรับ Password)
#define FLAG_ADDR   200   // 1 byte flag ว่ามี credentials หรือยัง
#define EEPROM_FLAG 0xAA  // flag value ที่บอกว่าบันทึกแล้ว

// ================= PIN & LOGIC =================
#define RELAY 26
#define SOIL_SENSOR 34
#define WATER_SENSOR 35
#define PUMP_ON LOW    // Active Low
#define PUMP_OFF HIGH  // Active Low

// ================= VARIABLES =================
WiFiClientSecure espClient;
PubSubClient client(espClient);

enum Mode { AUTO = 0, TIMER = 1, MANUAL_MODE = 2 };
Mode currentMode = AUTO;

bool isPumpRunning = false;
unsigned long pumpStartTime = 0;
unsigned long pumpLimitMs = 0;
unsigned long lastMsg = 0;
unsigned long lastAutoRun = 0;
const long autoCooldown = 10000;    // พัก 10 วินาทีค่อยเช็คดินใหม่

int targetMoisture = 40;       
int timerStartHour = 8;        
int timerStartMin = 0;
int timerDurationMin = 10;     
bool timerTriggeredToday = false; 

// ================= EEPROM FUNCTIONS =================
void writeStringToEEPROM(int addr, String data, int maxLen) {
  for (int i = 0; i < maxLen; i++) {
    if (i < data.length()) {
      EEPROM.write(addr + i, data[i]);
    } else {
      EEPROM.write(addr + i, 0);
    }
  }
}

String readStringFromEEPROM(int addr, int maxLen) {
  String result = "";
  for (int i = 0; i < maxLen; i++) {
    char c = EEPROM.read(addr + i);
    if (c == 0) break;
    result += c;
  }
  return result;
}

void saveWiFiCredentials(String ssid, String password) {
  writeStringToEEPROM(SSID_ADDR, ssid, 64);
  writeStringToEEPROM(PASS_ADDR, password, 128);
  EEPROM.write(FLAG_ADDR, EEPROM_FLAG);
  EEPROM.commit();
  Serial.println(">>> WiFi credentials saved to EEPROM!");
  Serial.println(">>> SSID: " + ssid);
}

bool loadWiFiCredentials(String &ssid, String &password) {
  if (EEPROM.read(FLAG_ADDR) != EEPROM_FLAG) {
    Serial.println(">>> No saved WiFi in EEPROM");
    return false;
  }
  ssid = readStringFromEEPROM(SSID_ADDR, 64);
  password = readStringFromEEPROM(PASS_ADDR, 128);
  Serial.println(">>> Loaded saved WiFi: " + ssid);
  return ssid.length() > 0;
}

// ================= PUMP CONTROL =================
void stopPump() {
  digitalWrite(RELAY, PUMP_OFF);
  isPumpRunning = false;
  lastAutoRun = millis();
  Serial.println(">>> [PUMP OFF]");
}

void startPump(unsigned long durationMs, String reason) {
  int waterRaw = analogRead(WATER_SENSOR);
  int waterPercent = constrain(map(waterRaw, 0, 2500, 0, 100), 0, 100);

  if (waterPercent < 10) {
    Serial.println(">>> [ABORT] Water too low!");
    return;
  }

  digitalWrite(RELAY, PUMP_ON);
  isPumpRunning = true;
  pumpStartTime = millis();
  pumpLimitMs = durationMs;
  Serial.println(">>> [PUMP ON] " + reason + " for " + String(durationMs/1000) + "s");
}

// ================= MQTT & WIFI =================
bool tryConnectWiFi(const char* ssid, const char* password, int maxRetry) {
  Serial.printf("\nConnecting to WiFi: %s\n", ssid);
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  int retry = 0;
  while (WiFi.status() != WL_CONNECTED && retry < maxRetry) {
    delay(500); Serial.print("."); retry++;
  }
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\nWiFi Connected! IP: " + WiFi.localIP().toString());
    return true;
  }
  Serial.println("\nFailed to connect to " + String(ssid));
  WiFi.disconnect();
  return false;
}

void setup_wifi() {
  // 1. ลองใช้ WiFi ที่บันทึกไว้ใน EEPROM ก่อน
  String savedSSID, savedPass;
  if (loadWiFiCredentials(savedSSID, savedPass)) {
    if (tryConnectWiFi(savedSSID.c_str(), savedPass.c_str(), 20)) {
      configTime(gmtOffset_sec, 0, ntpServer);
      return;  // เชื่อมต่อได้แล้ว!
    }
    Serial.println(">>> Saved WiFi failed, trying backup...");
  }

  // 2. Fallback ไปใช้ WiFi สำรอง (RodjaiBackup)
  if (tryConnectWiFi(BACKUP_SSID, BACKUP_PASS, 20)) {
    configTime(gmtOffset_sec, 0, ntpServer);
  }
}

void callback(char* topic, byte* payload, unsigned int length) {
  String msg = "";
  for (int i = 0; i < length; i++) msg += (char)payload[i];
  Serial.println("MQTT In: " + msg);
  
  if (msg.startsWith("ON:")) {
    currentMode = MANUAL_MODE;
    startPump(msg.substring(3).toInt() * 1000, "Manual Command");
  } else if (msg == "OFF") {
    stopPump();
  } else if (msg.startsWith("SET_MODE:")) {
    if (isPumpRunning) stopPump(); // หยุดปั๊มก่อนเปลี่ยนโหมด
    currentMode = (Mode)msg.substring(9).toInt();
    Serial.printf("Mode switched to: %d\n", currentMode);
  } else if (msg.startsWith("SET_MOIST:")) {
    targetMoisture = msg.substring(10).toInt();
    Serial.printf("Moisture threshold: %d%%\n", targetMoisture);
  }
  // ===== รับคำสั่งเปลี่ยน WiFi จากหน้าเว็บ =====
  else if (msg.startsWith("WIFI:")) {
    String wifiData = msg.substring(5); // ตัด "WIFI:" ออก → "ssid,password"
    int commaIndex = wifiData.indexOf(',');
    if (commaIndex > 0) {
      String newSSID = wifiData.substring(0, commaIndex);
      String newPass = wifiData.substring(commaIndex + 1);
      Serial.println(">>> Received new WiFi config!");
      Serial.println(">>> New SSID: " + newSSID);
      Serial.println(">>> Saving to EEPROM...");
      saveWiFiCredentials(newSSID, newPass);
      
      // แจ้งผ่าน MQTT ก่อน restart
      String ack = "{\"wifi_update\":\"ok\",\"new_ssid\":\"" + newSSID + "\"}";
      client.publish("sensor/data", ack.c_str());
      delay(1000);  // รอให้ส่ง MQTT ก่อน
      
      Serial.println(">>> Rebooting to connect new WiFi...");
      ESP.restart();  // restart เพื่อเชื่อมต่อ WiFi ใหม่
    } else {
      Serial.println(">>> Invalid WIFI command format! Expected WIFI:ssid,password");
    }
  }
}

void reconnect() {
  while (!client.connected()) {
    if (WiFi.status() != WL_CONNECTED) return;
    String clientId = "ESP32-Rodjai-" + String(random(0xffff), HEX);
    if (client.connect(clientId.c_str(), mqtt_username, mqtt_password)) {
      client.subscribe("sensor/command");
      Serial.println("MQTT Connected");
    } else {
      delay(5000);
    }
  }
}

// ================= SETUP =================
void setup() {
  WRITE_PERI_REG(RTC_CNTL_BROWN_OUT_REG, 0);
  Serial.begin(115200);

  EEPROM.begin(EEPROM_SIZE);

  pinMode(RELAY, OUTPUT);
  digitalWrite(RELAY, PUMP_OFF); // ปิดปั๊มทันทีที่บูต

  setup_wifi();
  espClient.setInsecure();
  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(callback);
}

// ================= LOOP =================
void loop() {
  unsigned long nowMs = millis();

  // 1. Safety FIRST — ทำก่อน WiFi check
  if (isPumpRunning) {
    // ปิดเมื่อครบเวลา
    if (nowMs - pumpStartTime >= pumpLimitMs) {
      Serial.println(">>> [SAFETY] Time limit reached");
      stopPump();
    }
    // ปิดทันทีถ้าน้ำในถังหมด (เช็คตลอดเวลา)
    int waterNow = constrain(map(analogRead(WATER_SENSOR), 0, 2500, 0, 100), 0, 100);
    if (waterNow < 10) {
      Serial.println(">>> [SAFETY] Water empty! Force stop!");
      stopPump();
    }
    // Auto mode: ปิดทันทีถ้าดินเปียกพอแล้ว
    if (currentMode == AUTO) {
      int soilNow = constrain(map(analogRead(SOIL_SENSOR), 4095, 1500, 0, 100), 0, 100);
      if (soilNow >= targetMoisture) {
        Serial.println(">>> [AUTO] Soil wet enough, stopping pump");
        stopPump();
      }
    }
  }

  // 2. WiFi & MQTT
  if (WiFi.status() != WL_CONNECTED) {
    if (nowMs - lastMsg > 5000) { WiFi.reconnect(); lastMsg = nowMs; }
    return; // ข้าม logic แต่ safety check ด้านบนยังทำงาน
  }
  if (!client.connected()) reconnect();
  client.loop();

  // 3. Logic Control (เฉพาะตอนปั๊มไม่ทำงาน)
  if (!isPumpRunning) {
    struct tm timeinfo;
    bool timeOk = getLocalTime(&timeinfo);

    // --- AUTO MODE: รด 5 วิ → เช็คดิน → ยังไม่ถึง min → รดต่อ ---
    if (currentMode == AUTO) {
      int soilRaw = analogRead(SOIL_SENSOR);
      int soilPercent = constrain(map(soilRaw, 4095, 1500, 0, 100), 0, 100);
      Serial.printf(">>> [AUTO] Soil: %d%% | Threshold: %d%% | ", soilPercent, targetMoisture);

      if (soilPercent < targetMoisture) {
        Serial.println("=> DRY! Watering 5 sec...");
        startPump(5000, "Auto Mode");  // รด 5 วินาที
      } else {
        Serial.println("=> Soil OK, no watering needed");
      }
    } 
    // --- TIMER MODE ---
    else if (currentMode == TIMER && timeOk) {
      if (timeinfo.tm_hour == timerStartHour && timeinfo.tm_min == timerStartMin) {
        if (!timerTriggeredToday) {
          startPump(timerDurationMin * 60000UL, "Timer Mode");
          timerTriggeredToday = true;
        }
      }
      if (timeinfo.tm_hour != timerStartHour || timeinfo.tm_min != timerStartMin) {
        timerTriggeredToday = false; 
      }
    }
  }

  // 4. Publish Data ทุก 3 วินาที
  if (nowMs - lastMsg > 3000) {
    lastMsg = nowMs;
    int soilRaw = analogRead(SOIL_SENSOR);
    int waterRaw = analogRead(WATER_SENSOR);
    int soilPercent = constrain(map(soilRaw, 4095, 1500, 0, 100), 0, 100);
    int waterPercent = constrain(map(waterRaw, 0, 2500, 0, 100), 0, 100);

    Serial.printf("DEBUG | SoilRaw: %d (%d%%) | WaterRaw: %d (%d%%)\n", soilRaw, soilPercent, waterRaw, waterPercent);

    String json = "{\"device\":\"" + String(DEVICE_SN) + 
                  "\",\"moisture\":" + String(soilPercent) + 
                  ",\"soil_raw\":" + String(soilRaw) +
                  ",\"water_raw\":" + String(waterRaw) +
                  ",\"mode\":" + String(currentMode) +
                  ",\"pump\":\"" + (isPumpRunning ? "ON" : "OFF") + 
                  "\",\"water\":" + String(waterPercent) +
                  ",\"threshold\":" + String(targetMoisture) + "}";
    client.publish("sensor/data", json.c_str());
  }
}
