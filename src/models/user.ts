import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

import { IUserDB } from "@/interfaces/user";
import { userTypes } from "@/constants/role";

const UserSchema = new Schema<IUserDB>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: String, required: true },
    role: { type: String, enum: userTypes, required: true },
    skills: { type: [String] },
    experience: { type: String },
  },
  { timestamps: true }
);

UserSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User =
  mongoose.models.User || mongoose.model<IUserDB>("User", UserSchema);

export default User;
