// models/SensorData.ts
import mongoose from 'mongoose';
import { ISensor } from '../types/sensor';

const sensorDataSchema = new mongoose.Schema<ISensor>({
  device_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Device', 
    required: true // ระบุว่าข้อมูลนี้มาจากเครื่องไหน
  },
  moisture_percent: { type: Number, required: true }, // soilPercent
  water_level_percent: { type: Number, required: true }, // waterPercent
  pump_status: { 
    type: String, 
    enum: ['ON', 'OFF'], 
    required: true 
  },
  current_mode: { type: Number, required: true },
  
  // ค่า Raw เผื่อเอาไว้ทำ Calibration
  raw_soil: { type: Number },
  raw_water: { type: Number }
}, {
  timestamps: true // เวลาที่บันทึกข้อมูล (สำคัญมากสำหรับการทำกราฟ)
});

// แนะนำ: ถ้าระบบใหญ่ขึ้น อาจต้องตั้ง TTL (Time-To-Live) index เพื่อลบข้อมูลเก่าๆ ทิ้งอัตโนมัติ
// sensorDataSchema.index({ createdAt: 1 }, { expireAfterSeconds: 2592000 }); // ลบข้อมูลที่เก่ากว่า 30 วัน

export const SensorData = mongoose.model('SensorData', sensorDataSchema);