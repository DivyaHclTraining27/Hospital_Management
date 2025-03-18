import * as Yup from "yup";

export const registerSchema = Yup.object({
  name: Yup.string()
    .min(6, "Name must be at least 6 characters")
    .required("Name is required"),

  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  mobile: Yup.string()
    .matches(/^\d{10}$/, "Mobile number must be 10 digits")
    .required("Mobile number is required"),

  role: Yup.string().required("Role is required"),

  skills: Yup.array().when("role", {
    is: "job-seeker",
    then: (schema) =>
      schema
        .min(1, "At least one skill is required")
        .required("Skills are required"),
    otherwise: (schema) => schema.notRequired(),
  }),

  experience: Yup.string()
    .matches(/^\d{1,2}$/, "Experience must be a 1 or 2 digit number")
    .test(
      "valid-range",
      "Experience must be between 0 and 50 years",
      (value) => {
        if (!value) return true; // Allow empty if not required
        const num = Number(value);
        return num >= 0 && num <= 50;
      }
    )
    .when("role", {
      is: "job-seeker",
      then: (schema) => schema.required("Experience is required"),
      otherwise: (schema) => schema.notRequired(),
    }),

  password: Yup.string()
    .min(5, "Password must be at least 5 characters")
    .required("Password is required"),
});
