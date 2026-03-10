// models/Device.ts
import mongoose from 'mongoose';
import { IDevice } from '../types/device';

const deviceSchema = new mongoose.Schema<IDevice>({
  serial_number: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  owner_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  location: { type: String, required: true },
  connectivity: {
    ssid: { type: String }
  },
  
  // ข้อมูลพื้นฐานที่โชว์บนแอป
  is_online: { type: Boolean, default: false },
  battery_level: { type: Number, default: 100 }, // สมมติว่าในอนาคตมีแบตเตอรี่
  plants_info: { type: String, default: "Not specified" },

  // --- ส่วนที่เพิ่มใหม่: เก็บการตั้งค่า (Config) ของเครื่อง ---
  config: {
    mode: { 
      type: Number, 
      enum: [0, 1, 2], // 0: Auto, 1: Timer, 2: Manual (ตาม Enum ใน ESP32)
      default: 0 
    },
    target_moisture: { 
      type: Number, 
      default: 40 // ค่าเริ่มต้นตามโค้ด
    },
    timer_start_hour: { type: Number, default: 8 },
    timer_start_min: { type: Number, default: 0 },
    timer_duration_min: { type: Number, default: 10 }
  }
}, {
  timestamps: true
});

export const Device = mongoose.model('Device', deviceSchema);