import mqtt from 'mqtt';
import { mqttConfig } from '../config/mqtt';
import { SensorData } from '@/model/sensor';
import { Device } from '@/model/device';

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
            
            // Update Device online status and battery
            if (payload.device) {
                // 1. Find device and update online status
                const device = await Device.findOneAndUpdate(
                    { serial_number: payload.device },
                    { 
                        is_online: true, 
                        battery_level: payload.battery || 100, // Assuming ESP32 might send battery later
                        last_seen: new Date()
                    },
                    { returnDocument: 'after' } // Return the updated document
                );

                if (device) {
                    // console.log('✅ Update online status result: Success');
                    
                    // 2. Create new SensorData log Document linked to this device
                    const newLog = new SensorData({
                        device_id: device._id,
                        moisture_percent: payload.moisture || 0,
                        water_level_percent: payload.water || 0,
                        pump_status: payload.pump || 'OFF',
                        current_mode: payload.mode || 0,
                        raw_soil: payload.soil_raw || 0,
                        raw_water: payload.water_raw || 0,
                    });

                    await newLog.save();
                    // console.log('💾 Sensor data saved to MongoDB');
                } else {
                    console.log('⚠️ Device not found in DB. Data rejected.');
                }
            } else {
                console.log('⚠️ No device field in payload. Cannot update online status or save data.');
            }
        } catch (error) {
            console.error('❌ Error processing MQTT message:', error);
        }
    });

    client.on('error', (err) => {
        console.error('MQTT Connection Error:', err);
    });
};

import cron from 'node-cron';

// Run every minute to check for offline devices
cron.schedule('* * * * *', async () => {
    try {
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000); // 5 minutes threshold
        
        // Find devices that are marked online but haven't updated in 5 minutes
        // Or devices where last_seen is null but are marked online
        const updated = await Device.updateMany(
            { 
                is_online: true, 
                $or: [
                    { last_seen: { $lt: fiveMinutesAgo } },
                    { last_seen: null }
                ]
            },
            { 
                $set: { is_online: false } 
            }
        );
        
        if (updated.modifiedCount > 0) {
            console.log(`🔌 Marked ${updated.modifiedCount} devices as offline (no signal for 5 minutes)`);
        }
    } catch (err) {
        console.error('❌ Error in offline checker cron:', err);
    }
});