import * as Yup from "yup";

export const LoginUserSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password length must be at least 8 characters")
    .required("Password is required"),
});
