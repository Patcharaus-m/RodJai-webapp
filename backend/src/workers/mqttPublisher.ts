import mqtt, { MqttClient } from 'mqtt';
import { mqttConfig } from '../config/mqtt';

let client: MqttClient | null = null;

export const getMQTTClient = (): MqttClient => {
    if (!client || !client.connected) {
        client = mqtt.connect(mqttConfig.host, mqttConfig.options);
        client.on('connect', () => {
            console.log('📡 MQTT Publisher connected');
        });
        client.on('error', (err) => {
            console.error('❌ MQTT Publisher error:', err);
        });
    }
    return client;
};

export const publishCommand = (topic: string, message: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        const mqttClient = getMQTTClient();
        mqttClient.publish(topic, message, (err) => {
            if (err) {
                console.error('❌ Failed to publish:', err);
                reject(err);
            } else {
                console.log(`📤 Published to ${topic}: ${message}`);
                resolve();
            }
        });
    });
};
