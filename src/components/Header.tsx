"use client";
import React, { SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession() || {};
  const router = useRouter();
  const handleRouting = (e: SyntheticEvent<HTMLButtonElement>) => {
    const { name } = e?.target as HTMLButtonElement;
    router?.push(`/${name}`);
  };

  return (
    <div
      className="h-16 flex justify-between items-stretch border border-violet-200 px-3"
      data-testid="header-component"
    >
      <button
        onClick={() => router.push("/")}
        className="flex items-center hover:cursor-pointer"
      >
        <p className="font-bold text-2xl">Naukri.com</p>
      </button>
      {!session ? (
        <div className="flex gap-2 items-center">
          <button
            name="register"
            onClick={handleRouting}
            className="border border-black px-2 py-1 rounded-sm"
          >
            Register
          </button>
          <button
            name="login"
            onClick={handleRouting}
            className="border border-black px-2 py-1 rounded-sm"
          >
            Login
          </button>
        </div>
      ) : (
        <div className="flex gap-2 items-center">
          <div>
            <p>User type: {(session?.user as { role: string })?.role}</p>
            <p>Name: {session?.user?.name}</p>
          </div>
          {/* {(session?.user as { role: string })?.role !== "job-seeker" && (
            <button
              name="signOut"
              onClick={() => router.push("/job/create")}
              className="border border-black px-2 py-1 rounded-sm"
            >
              Create job
            </button>
          )} */}

          {(session?.user as { role: string })?.role === "job-seeker" && (
            <button
              name="signOut"
              onClick={() => router.push("/applications")}
              className="border border-black px-2 py-1 rounded-sm"
            >
              Application status
            </button>
          )}

          <button
            data-testid="signOut"
            name="signOut"
            onClick={() => signOut()}
            className="border border-black px-2 py-1 rounded-sm bg-red-500"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
