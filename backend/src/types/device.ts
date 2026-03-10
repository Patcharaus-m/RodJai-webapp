import { Document } from 'mongoose';

export interface IDevice extends Document {
  serial_number: string;
  name?: string | null;
  owner_id?: string;
  location?: string;
  connectivity?: {
    ssid?: string;
  };
  is_online?: boolean;
  battery_level?: number;
  plants_info?: string;
  config?: {
    mode?: number;
    target_moisture?: number;
    timer_start_hour?: number;
    timer_start_min?: number;
    timer_duration_min?: number;
  };
  created_at: Date;
  updated_at: Date;
}