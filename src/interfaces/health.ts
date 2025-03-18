import mongoose from "mongoose";

export interface IHealth {
  userId: mongoose.Schema.Types.ObjectId,
  bloodSugar: number
  bloodPressure: string,
  weight: number,
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IEmployer {
  name: string;
  id: mongoose.Schema.Types.ObjectId;
}
