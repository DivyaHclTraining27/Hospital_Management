"use client";
import { useState } from "react";
import Link from "next/link";
import { Formik, FastField, Form, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Select from "react-select";
import isEmpty from "lodash/isEmpty";

// import { registerSchema } from "@/schemas/registerSchema";
import { IUser } from "@/interfaces/user";
import { API, AUTH, LOGIN, POST, REGISTER } from "@/constants/api";
import { customFetch } from "@/lib/api";
import {
  COMMON_ERROR,
  CUSTOM_ERRORS,
  REGISTERED_SUCCESSFULLY,
} from "@/constants/msg";
import logger from "@/logger/winston.logger";

const Register = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const initialValues: IUser = {
    name: "",
    email: "",
    password: "",
    mobile: "",
    role: "patient",
    // skills: [],
    experience: "",
  };

  /**
   * Description for the below snippet
   *
   * @param {IUser} values
   */
  const registerUser = async (values: IUser) => {
    try {
      const { data, msgCode }: { data: IUser; msgCode?: string } =
        await customFetch<IUser, IUser>({
          path: `/${API}/${AUTH}/${REGISTER}`,
          method: POST,
          data: values,
        });
      if (!isEmpty(data)) {
        toast.success(REGISTERED_SUCCESSFULLY);
        router.push(LOGIN);
      } else {
        logger.error(
          "err occured",
          CUSTOM_ERRORS?.[msgCode as keyof typeof CUSTOM_ERRORS]
        );
      }
    } catch (err) {
      console.log("err", err);
      toast.error(COMMON_ERROR);
    }
  };

  return (
    <div className="flex items-center justify-center h-full w-full bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md overflow-auto custom-scrollbar">
        <h2 className="text-2xl font-bold text-center">Register</h2>
        <Formik
          initialValues={initialValues}
          // validationSchema={registerSchema}
          onSubmit={(values: IUser) => {
            registerUser(values);
          }}
        >
          {({ setFieldValue, values }) => (
            <Form className="space-y-4 max-h-[400px]">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name*
                </label>
                <FastField
                  data-testid="name"
                  name="name"
                  type="text"
                  className="w-full py-2 px-3 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-sm text-red-600"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email*
                </label>
                <FastField
                  data-testid="email"
                  name="email"
                  type="email"
                  className="w-full py-2 px-3 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-sm text-red-600"
                />
              </div>

              <div>
                <label
                  htmlFor="mobile"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mobile*
                </label>
                <FastField
                  data-testid="mobile"
                  name="mobile"
                  type="text"
                  className="w-full py-2 px-3 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
                <ErrorMessage
                  name="mobile"
                  component="div"
                  className="text-sm text-red-600"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password*
                </label>
                <div className="relative">
                  <FastField
                    data-testid="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="w-full py-2 px-3 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
                  >
                    {!showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-sm text-red-600"
                />
              </div>

              {/* <div>
                <label className="block text-sm font-medium text-gray-700">
                  Role*
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <FastField
                      type="radio"
                      name="role"
                      value="admin"
                      className="mr-2"
                    />
                    Provider
                  </label>
                  <label className="flex items-center">
                    <FastField
                      type="radio"
                      name="role"
                      value="patient"
                      className="mr-2"
                    />
                    Patient
                  </label>

                </div>
                <ErrorMessage
                  name="role"
                  component="div"
                  className="text-sm text-red-600"
                />
              </div> */}

              {/* {values?.role === "patient" && (
                <>
                  <div>
                    <label
                      htmlFor="skills"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Skills*
                    </label>
                    <Select
                      data-testid="skills"
                      name="skills"
                   //   options={skillOptions}
                      isMulti
                      className="mt-1"
                      classNamePrefix="select"
                      onChange={(selectedOptions) =>
                        setFieldValue(
                          "skills",
                          selectedOptions
                            ? selectedOptions.map((option) => option.value)
                            : []
                        )
                      }
                    />
                    <ErrorMessage
                      name="skills"
                      component="div"
                      className="text-sm text-red-600"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="experience"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Experience (in years)*
                    </label>
                    <FastField
                      data-testid="experience"
                      name="experience"
                      type="number"
                      className="w-full py-2 px-3 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <ErrorMessage
                      name="experience"
                      component="div"
                      className="text-sm text-red-600"
                    />
                  </div>
                </>
              )} */}

              <button
                data-testid="register"
                type="submit"
                className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Register
              </button>
              <p className="pb-8">
                Already have an account? Click here to{" "}
                <Link data-testid="anchor" href="/" className="text-blue-500">
                  Login
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
