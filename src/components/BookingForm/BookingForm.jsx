import { ErrorMessage, Field, Form, Formik } from "formik";
import { addBookingSchema } from "../../utils/schemas";
import styles from "./BookingForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addBookings } from "../../redux/booking/operations";
import { isBookingsLoading } from "../../redux/booking/selectors";

const initialValues = {
  clientName: "",
  phoneNumber: "",
  serviceType: "",
  time: "",
  date: "",
};

const BookingForm = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(isBookingsLoading);

  const handleSubmit = (values, actions) => {
    dispatch(addBookings(values));
    console.log(values);
    actions.resetForm();
  };

  return (
    <div className={styles.contact_form_div}>
      <Formik
        initialValues={initialValues}
        validationSchema={addBookingSchema}
        onSubmit={handleSubmit}
      >
        <Form className={styles.form}>
          <label className={styles.label}>
            <span>Name: </span>
            <Field
              type="text"
              name="clientName"
              className={styles.input}
              placeholder="Name"
            />
            <ErrorMessage
              className={styles.errorMessage}
              name="clientName"
              component="span"
            />
          </label>
          <label className={styles.label}>
            <span>Number: </span>
            <Field
              className={styles.input}
              name="phoneNumber"
              type="tel"
              placeholder="+380*******"
            />
            <ErrorMessage
              className={styles.errorMessage}
              name="phoneNumber"
              component="span"
            />
          </label>
          <label className={styles.label}>
            <span>Service: </span>
            <Field as="select" className={styles.input} name="serviceType">
              <option disabled value="">
                Select service
              </option>
              <option value="nail">Nail</option>
              <option value="manicure">Manicure</option>
            </Field>
            <ErrorMessage
              className={styles.errorMessage}
              name="serviceType"
              component="span"
            />
          </label>
          <label className={styles.label}>
            <span>Time: </span>
            <Field className={styles.input} name="time" type="time" />
            <ErrorMessage
              className={styles.errorMessage}
              name="time"
              component="span"
            />
          </label>
          <label className={styles.label}>
            <span>date: </span>
            <Field className={styles.input} name="date" type="date" />
            <ErrorMessage
              className={styles.errorMessage}
              name="date"
              component="span"
            />
          </label>
          <button className={styles.button} type="submit" disabled={isLoading}>
            {isLoading ? "Adding Booking..." : "Booking"}
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default BookingForm;
