import { Request, Response } from 'express';
import { SensorData } from '../../model/sensor';

export const getSensorHistory = async (req: Request, res: Response) => {
  try {
    // ดึงข้อมูล 100 รายการล่าสุด
    const logs = await SensorData.find().sort({ timestamp: -1 }).limit(100);
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving data", error });
  }
};