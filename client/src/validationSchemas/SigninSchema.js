import * as Yup from "yup";

export const SigninSchema = Yup.object({
  password: Yup.string()
    // .max(15, "Must be 15 characters or less")
    // .min(3, "Must be at least 3 characters")
    .required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
});
