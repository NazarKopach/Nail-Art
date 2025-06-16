import { useDispatch, useSelector } from "react-redux";
import styles from "./LoginPage.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { LoginUserSchema } from "../../utils/schemas";
import { apiLoginUser } from "../../redux/auth/operations";
import { selectUserIsLoading } from "../../redux/auth/selectors";
import { toast } from "react-toastify";

const INITIAL_VALUES = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectUserIsLoading);

  const handleSubmit = async (values, actions) => {
    try {
      await dispatch(apiLoginUser(values)).unwrap();
      actions.resetForm();
    } catch (err) {
      const message = err.message || "Something went wrong...";
      actions.setStatus(message);
      toast.error(message);
    }
  };

  return (
    <div className={styles.login_form_div}>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={LoginUserSchema}
        onSubmit={handleSubmit}
      >
        <Form className={styles.form}>
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
          <button className={styles.button} type="submit">
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginPage;
