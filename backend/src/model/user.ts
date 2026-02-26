import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true }, // อีเมล [cite: 39]
    username: { type: String, required: true, unique: true }, // ชื่อ [cite: 36]
    password: { type: String, required: true }, // รหัส [cite: 37]
    line_user_id: { type: String, unique: true }, // line user id [cite: 41]
    subscription: { type: String }, // subscription [cite: 43]
    created_at: { type: Date, default: Date.now }, // created at [cite: 44]
    terms_agreement_version: { type: String}, // terms agreement version [cite: 45]
    terms_agreement_agreed_at: { type: Date},
    terms_agreement_consent: { type: Boolean},
    profile_image: { type: String },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("User", UserSchema);