import { userTypes } from "@/constants/role";

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  mobile: string;
  password: string;
  role: (typeof userTypes)[number];
  skills?: string[];
  experience?: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserDB extends IUser, Document {
  matchPassword: (enteredPassword: string) => Promise<boolean>;
}

export const defaultUser = {
  name: "",
  email: "",
  password: "",
};
