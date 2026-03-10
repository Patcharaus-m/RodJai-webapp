import { Document, Types } from 'mongoose';

export interface ISensor extends Document {
  device_id: Types.ObjectId;
  moisture_percent: number;
  water_level_percent: number;
  pump_status: string;
  current_mode: number;
  raw_soil?: number;
  raw_water?: number;
  created_at: Date;
  updated_at: Date;
}