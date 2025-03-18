import { IHealth } from "@/interfaces/health";
import mongoose, { Schema } from "mongoose";

const healthSchema = new Schema<IHealth>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  bloodSugar: { type: Number },
  bloodPressure: { type: String },
  weight: { type: Number },

},
  { timestamps: true },
);

const Health = mongoose.models.Health || mongoose.model<IHealth>("Health", healthSchema);

export default Health;
