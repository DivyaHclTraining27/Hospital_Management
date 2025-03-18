"use client";

import { ReactNode, useState, useEffect } from "react";

const GlobalError = ({ children }: { children: ReactNode }) => {
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      setError(event.error);
      console.error("Unhandled error:", event.error);
    };

    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
  }, []);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-red-600 text-2xl font-bold">An error occurred!</h2>
        <p>{error.message}</p>
        <button
          onClick={() => setError(null)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Try Again
        </button>
      </div>
    );
  }

  return children;
};

export default GlobalError;
