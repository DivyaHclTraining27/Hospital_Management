"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import GlobalError from "@/components/GlobalError";

const App = ({ children }: { children: React.ReactNode }) => {
  return (
    <GlobalError>
      <SessionProvider>{children}</SessionProvider>
    </GlobalError>
  );
};

export default App;
