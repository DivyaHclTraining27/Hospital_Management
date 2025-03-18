"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, SignInOptions, useSession } from "next-auth/react";
import { Formik, FastField, Form, ErrorMessage } from "formik";

import { loginSchema } from "@/schemas/loginSchema";
import { IUserLogin } from "@/interfaces/user";

import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const validateUserLogin = (values: IUserLogin) => {
    signIn("credentials", values as unknown as SignInOptions);
  };

  useEffect(() => {
    if (session) {
      toast.success("Login successful");
      router.replace("/");
    }
  }, [router, session]);

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={(values) => {
            validateUserLogin(values);
          }}
        >
          <Form className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email<span className="text-red-500">*</span>
              </label>
              <FastField
                data-testid="email"
                name="email"
                type="email"
                className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              <ErrorMessage
                name="email"
                component={"div"}
                className="text-sm text-red-600"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password<span className="text-red-500">*</span>
              </label>
              <FastField
                data-testid="password"
                name="password"
                type="password"
                className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              <ErrorMessage
                name="password"
                component={"div"}
                className="text-sm text-red-600"
              />
            </div>
            <button
              data-testid="loginBtn"
              type="submit"
              className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
            <p>
              Don&apos;t have an account? Click here to{" "}
              <Link href="/register" className="text-blue-500">
                Register
              </Link>
            </p>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
