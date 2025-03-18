import Dashboard from "@/components/Dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Naukri.com",
};

export default function Home() {
  return (
    <div className="flex h-full w-full">
      <Dashboard />
    </div>
  );
}
