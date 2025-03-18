import { applicationStatus } from "@/constants/application";
import mongoose from "mongoose";
import { IJob } from "./job";
import { IUser } from "./user";

export interface IApplication {
  _id?: mongoose.Schema.Types.ObjectId;
  employerId: mongoose.Schema.Types.ObjectId;
  jobId: mongoose.Schema.Types.ObjectId | IJob;
  applicantId: mongoose.Schema.Types.ObjectId | IUser;
  status: (typeof applicationStatus)[number];
  createdAt?: Date;
}
