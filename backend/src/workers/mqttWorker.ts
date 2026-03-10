import mqtt from 'mqtt';
import { mqttConfig } from '../config/mqtt';
import { SensorData } from '@/model/sensor';

export const startMQTT = () => {
    const client = mqtt.connect(mqttConfig.host, mqttConfig.options);

    client.on('connect', () => {
        console.log('✅ Connected to HiveMQ Cloud');
        // Subscribe หัวข้อที่ต้องการ (เช่น sensor/data)
        client.subscribe('sensor/data', (err) => {
            if (!err) console.log('Subscribed to sensor/data');
        });
    });

    client.on('message', async (topic, message) => {
        try {
            // แปลงข้อมูลจาก Buffer เป็น JSON Object
            const payload = JSON.parse(message.toString());
            
            // สร้าง Document ใหม่และ Save ลง MongoDB
            const newLog = new SensorData({
                deviceName: payload.device || 'Unknown',
                temperature: payload.temp,
                humidity: payload.hum,
                timestamp: new Date()
            });

            await newLog.save();
            console.log('💾 Data saved to MongoDB:', payload);
        } catch (error) {
            console.error('❌ Error processing MQTT message:', error);
        }
    });

    client.on('error', (err) => {
        console.error('MQTT Connection Error:', err);
    });
};