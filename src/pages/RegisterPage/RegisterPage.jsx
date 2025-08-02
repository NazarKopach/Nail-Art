import styles from "./RegisterPage.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { RegisterUserSchema } from "../../utils/schemas";
import { useDispatch, useSelector } from "react-redux";
import { apiRegisterUser } from "../../redux/auth/operations";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

const INITIAL_VALUES = {
  name: "",
  email: "",
  password: "",
};

const RegisterPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);

  const handleSubmit = async (values, actions) => {
    try {
      await dispatch(apiRegisterUser(values)).unwrap();
      actions.resetForm();
      toast.success("Successful registration!");
    } catch (err) {
      toast.error(err.message || "Something went wrong...");
    }
  };

  return (
    <div className={styles.register_form_div}>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={RegisterUserSchema}
        onSubmit={handleSubmit}
      >
        <Form className={styles.form}>
          <label className={styles.label}>
            <span>Name:</span>
            <Field
              type="text"
              name="name"
              className={styles.input}
              placeholder="name"
            />
            <ErrorMessage
              className={styles.errorMessage}
              name="name"
              component="span"
            />
          </label>
          <label className={styles.label}>
            <span>Email:</span>
            <Field
              type="text"
              name="email"
              className={styles.input}
              placeholder="example.email@example.com"
            />
            <ErrorMessage
              className={styles.errorMessage}
              name="email"
              component="span"
            />
          </label>
          <label className={styles.label}>
            <span>Password:</span>
            <Field
              type="password"
              name="password"
              className={styles.input}
              placeholder="Enter your password"
            />
            <ErrorMessage
              className={styles.errorMessage}
              name="password"
              component="span"
            />
          </label>
          <div className={styles.register_form_link}>
            <button className={styles.button} type="submit">
              {isLoading ? "Singing Up..." : "Sign Up"}
            </button>
            <NavLink className={styles.register_page_nav} to="/login">
              Already have an account?
            </NavLink>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default RegisterPage;
