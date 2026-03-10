import { Request, Response } from 'express';
import { SensorData } from '../../model/sensor';

const getSensorHistory = async (req: Request, res: Response) => {
  try {
    // ดึงข้อมูล 50 รายการล่าสุด
    const data = await SensorData.find().sort({ timestamp: -1 }).limit(50);
    return res.status(200).json({
      status: true,
      message: "ดึงข้อมูลสำเร็จ",
      data: data
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "เกิดข้อผิดพลาดในการดึงข้อมูล",
      error: error
    });
  }
};

export default {
  getSensorHistory
};