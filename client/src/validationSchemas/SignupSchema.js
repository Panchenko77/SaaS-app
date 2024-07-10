import * as Yup from "yup";
export const SignupSchema = Yup.object({
  password: Yup.string()
    .max(15, "Must be 15 characters or less")
    .min(3, "Must be at least 3 characters")
    .required("Required"),
  confirmPassword: Yup.string()
    .min(3, "Must be at least 3 characters")
    .max(20, "Must be 20 characters or less")
    .required("Required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  email: Yup.string().email("Invalid email address").required("Required"),
  name: Yup.string()
    .min(3, "Must be at least 3 characters")
    .max(250, "Must be 50 characters or less")
    .required("Required"),
});
