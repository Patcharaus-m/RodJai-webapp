import { Device } from '../../model/device';
import { publishCommand } from '../../workers/mqttPublisher';
import { successRes, errRes } from '../main';

export const registerDeviceController = async (body: any, userId: string): Promise<ITypeReturnResponse<any>> => {
    try {
        const { serial_number, name, location } = body;

        if (!serial_number || !name) {
            return errRes.BAD_REQUEST({ message: 'กรุณากรอก Serial Number และชื่ออุปกรณ์' });
        }

        const existing = await Device.findOne({ serial_number });
        if (existing) {
            return {
                code: 409,
                status: 4091,
                error: { message: 'อุปกรณ์นี้ถูกลงทะเบียนแล้ว' },
                payload: null
            };
        }

        const newDevice = new Device({
            serial_number,
            name,
            location: location || 'Not specified',
            owner_id: userId
        });

        const savedDevice = await newDevice.save();

        return successRes(savedDevice.toObject());
    } catch (err: any) {
        return errRes.INTERNAL_SERVER_ERROR({ message: err.message || 'เกิดข้อผิดพลาดในการลงทะเบียน' });
    }
};

export const sendWiFiConfigController = async (body: any): Promise<ITypeReturnResponse<any>> => {
    try {
        const { serial_number, ssid, password } = body;

        if (!ssid || !password) {
            return errRes.BAD_REQUEST({ message: 'กรุณากรอก WiFi SSID และ Password' });
        }

        const command = `WIFI:${ssid},${password}`;
        await publishCommand('sensor/command', command);

        if (serial_number) {
            await Device.findOneAndUpdate(
                { serial_number },
                { 'connectivity.ssid': ssid }
            );
        }

        return successRes({ message: `ส่งคำสั่ง WiFi สำเร็จ — อุปกรณ์จะ restart เพื่อเชื่อมต่อ ${ssid}` });
    } catch (err: any) {
        return errRes.INTERNAL_SERVER_ERROR({ message: err.message || 'เกิดข้อผิดพลาดในการส่งคำสั่ง WiFi' });
    }
};

export const getUserDevicesController = async (userId: string): Promise<ITypeReturnResponse<any>> => {
    try {
        const devices = await Device.find({ owner_id: userId });
        return successRes(devices);
    } catch (err: any) {
        return errRes.INTERNAL_SERVER_ERROR({ message: err.message || 'เกิดข้อผิดพลาดในการดึงข้อมูลอุปกรณ์' });
    }
};
