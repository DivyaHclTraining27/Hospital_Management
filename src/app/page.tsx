import Home from "@/components/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Naukri.com",
};

export default function Root() {
  return (
    <div className="flex h-full w-full">
      <Home />
    </div>
  );
}
