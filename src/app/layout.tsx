import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";

import "./globals.css";
import App from "./_app";

export const metadata: Metadata = {
  title: "Disease Management",
  description: "Your job search ends here",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <App>
          <div className="h-screen w-screen flex flex-col">
            <ToastContainer position="top-right" autoClose={5000} />
            <div className="flex h-full w-full items-stretch overflow-hidden">
              {children}
            </div>
          </div>
        </App>
      </body>
    </html>
  );
}
