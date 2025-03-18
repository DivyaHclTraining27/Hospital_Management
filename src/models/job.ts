import { IJob } from "@/interfaces/job";
import mongoose, { Schema, Document } from "mongoose";

type IJobDB = IJob & Document;

const postSchema = new Schema<IJobDB>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    salary: {
      type: String,
    },
    noOfPosition: { type: String, required: true },
    employer: {
      name: { type: String, required: true },
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
    allApplicants: {
      type: [{ type: mongoose.Schema.Types.ObjectId }],
      ref: "User",
      default: [],
    },
    selectedApplicants: {
      type: [{ type: mongoose.Schema.Types.ObjectId }],
      ref: "User",
      default: [],
    },
  },
  { timestamps: true }
);

const Job = mongoose.models.Job || mongoose.model<IJobDB>("Job", postSchema);

export default Job;
