import dotenv from 'dotenv';
dotenv.config();

export const mqttConfig = {
    host: process.env.MQTT_HOST || '',
    options: {
        username: process.env.MQTT_USER || '',
        password: process.env.MQTT_PASS || '',
        protocol: 'mqtts' as const, // สำหรับ HiveMQ Cloud ที่ใช้ TLS
        port: 8883,
        clean: true,
        connectTimeout: 4000,
        reconnectPeriod: 1000,
    }
};