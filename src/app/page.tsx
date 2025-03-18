import Home from "@/components/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Health Care",
};

export default function Root() {
  return (
    <div className="flex h-full w-full">
      <Home />
    </div>
  );
}
