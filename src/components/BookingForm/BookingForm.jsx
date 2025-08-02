import styles from "./BookingForm.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { addBookingSchema } from "../../utils/schemas";
import { useDispatch, useSelector } from "react-redux";
import { addBookings } from "../../redux/booking/operations";
import { allBookings, isBookingsLoading } from "../../redux/booking/selectors";
import { toast } from "react-toastify";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";

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
  const dataBookings = useSelector(allBookings);

  const handleSubmit = async (values, actions) => {
    try {
      await dispatch(addBookings(values)).unwrap();
      toast.success("Successfuly add booking!");
      actions.resetForm();
    } catch (err) {
      toast.error(err.message || "Something went wrong...");
    }
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
              placeholder="+48*******"
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
            <Field as="select" className={styles.input} name="time" type="time">
              <option disabled value="">
                Select time
              </option>
              <option value="9:00">9:00</option>
              <option value="11:00">11:00</option>
              <option value="13:00">13:00</option>
              <option value="15:00">15:00</option>
              <option value="17:00">17:00</option>
              <option value="19:00">19:00</option>
            </Field>
            <ErrorMessage
              className={styles.errorMessage}
              name="time"
              component="span"
            />
          </label>
          <label className={styles.label}>
            <span>Date: </span>
            <Field name="date">
              {({ field, form }) => {
                const disabledDates = Array.isArray(dataBookings)
                  ? dataBookings
                      .map((booking) => new Date(booking.date))
                      .filter((date) => !isNaN(date))
                  : [];

                return (
                  <Flatpickr
                    className={styles.input}
                    placeholder="Booking date"
                    options={{
                      enableTime: false,
                      dateFormat: "Y-m-d",
                      minDate: "today",
                      disable: disabledDates,
                    }}
                    value={field.value}
                    onChange={(date) => {
                      form.setFieldValue("date", date[0]);
                    }}
                  />
                );
              }}
            </Field>
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
