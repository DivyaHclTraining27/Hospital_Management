import Register from "@/components/Register";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Register",
  description: "Register yourself",
};

const page = () => {
  return <Register />;
};

export default page;
