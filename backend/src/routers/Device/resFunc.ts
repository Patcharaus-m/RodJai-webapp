import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import controllers from '../../controllers/Device';

// POST /api/device/register
const registerDevice = async (req: Request, res: Response) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ status: false, message: 'No token provided' });
        }

        const token = authHeader.split(" ")[1];
        let decoded: any;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET!);
        } catch (err) {
            return res.status(401).json({ status: false, message: 'Invalid token' });
        }

        const data = await controllers.registerDevice(req.body, decoded.id);
        
        // Map data.code to HTTP status and return in expected format
        if (data.code === 201 || data.code === 200) {
            return res.status(data.code).json({
                status: true,
                message: 'ลงทะเบียนอุปกรณ์สำเร็จ',
                data: data.payload
            });
        }
        
        return res.status(data.code).json({
            status: false,
            message: (data.error as any)?.message || 'เกิดข้อผิดพลาดในการลงทะเบียน'
        });
    } catch (error: any) {
        return res.status(500).json({ status: false, message: error.message });
    }
};

// POST /api/device/wifi
const sendWiFiConfig = async (req: Request, res: Response) => {
    try {
        const data = await controllers.sendWiFiConfig(req.body);
        
        if (data.code === 201 || data.code === 200) {
            return res.status(data.code).json({
                status: true,
                message: data.payload?.message || 'ส่งคำสั่ง WiFi สำเร็จ'
            });
        }
        
        return res.status(data.code).json({
            status: false,
            message: (data.error as any)?.message || 'เกิดข้อผิดพลาดในการส่งคำสั่ง WiFi'
        });
    } catch (error: any) {
        return res.status(500).json({ status: false, message: error.message });
    }
};

// GET /api/device/user
const getUserDevices = async (req: Request, res: Response) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ status: false, message: 'No token provided' });
        }

        const token = authHeader.split(" ")[1];
        let decoded: any;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET!);
        } catch (err) {
            return res.status(401).json({ status: false, message: 'Invalid token' });
        }

        const data = await controllers.getUserDevices(decoded.id);
        
        if (data.code === 201 || data.code === 200) {
            return res.status(200).json({
                status: true,
                message: 'ดึงข้อมูลอุปกรณ์สำเร็จ',
                data: data.payload
            });
        }
        
        return res.status(data.code).json({
            status: false,
            message: (data.error as any)?.message || 'เกิดข้อผิดพลาดในการดึงข้อมูลอุปกรณ์'
        });
    } catch (error: any) {
        return res.status(500).json({ status: false, message: error.message });
    }
};

export default {
    registerDevice,
    sendWiFiConfig,
    getUserDevices
};
