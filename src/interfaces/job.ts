import mongoose from "mongoose";

export interface IJob {
  _id?: mongoose.Schema.Types.ObjectId;
  title: string;
  description: string;
  location: string;
  salary: string;
  noOfPosition: string;
  employer: IEmployer | mongoose.Schema.Types.ObjectId;
  allApplicants?: mongoose.Schema.Types.ObjectId[];
  selectedApplicants?: mongoose.Schema.Types.ObjectId[];
  experience?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IEmployer {
  name: string;
  id: mongoose.Schema.Types.ObjectId;
}
