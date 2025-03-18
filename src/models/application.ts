import mongoose, { Document, Schema } from "mongoose";

import { IApplication } from "@/interfaces/application";
import { applicationStatus } from "@/constants/application";

type IApplicationDB = IApplication & Document;

const ApplicationSchema = new Schema<IApplicationDB>(
  {
    employerId: {
      type: Schema.ObjectId,
      ref: "User",
      required: true,
    },
    applicantId: {
      type: Schema.ObjectId,
      ref: "User",
      required: true,
    },
    jobId: {
      type: Schema.ObjectId,
      ref: "Job",
      required: true,
    },
    status: {
      type: String,
      enum: applicationStatus,
      default: "pending",
      required: true,
    },
  },
  { timestamps: true }
);

const Application =
  mongoose.models.Application ||
  mongoose.model<IApplicationDB>("Application", ApplicationSchema);

export default Application;
