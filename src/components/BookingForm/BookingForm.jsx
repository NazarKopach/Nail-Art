import styles from "./BookingForm.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { addBookingSchema } from "../../utils/schemas";
import { useDispatch, useSelector } from "react-redux";
import { addBookings, fetchBookings } from "../../redux/booking/operations";
import { allBookings, isBookingsLoading } from "../../redux/booking/selectors";
import { toast } from "react-toastify";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { useEffect, useMemo, useState } from "react";

const initialValues = {
  clientName: "",
  phoneNumber: "",
  serviceType: "",
  dodatek: "",
  time: "",
  date: "",
};

const BookingForm = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(isBookingsLoading);
  const dataBookings = useSelector(allBookings);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  const reservation = dataBookings.map((item) => {
    const reservedTime = item.time;
    const reservedDate = item.date.split("T")[0];
    return {
      date: reservedDate,
      time: reservedTime,
    };
  });

  const time = ["9:00", "11:00", "13:00", "15:00", "17:00"];
  const dodatek = [
    "Zdobienia",
    "Przedluzenie 1 paznokcia",
    "French",
    "Usuwanie materialu",
  ];
  const services = [
    "Manicure hybrydowy",
    "Zel(krotki)",
    "Zel(srednia dlugosc od 1)",
    "Zel(dlugie od 2)",
    "Przedluzanie (do 3)",
    "Przedluzanie (od 3)",
  ];

  const availableTimes = useMemo(() => {
    if (!selectedDate) return time;
    const formattedDate = selectedDate.toISOString().split("T")[0];
    return time.filter(
      (t) =>
        !reservation.some((res) => res.date === formattedDate && res.time === t)
    );
  }, [selectedDate, reservation]);

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
              {services.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </Field>
            <ErrorMessage
              className={styles.errorMessage}
              name="serviceType"
              component="span"
            />
          </label>
          <label className={styles.label}>
            <span>Dodatkowo:</span>
            <Field as="select" className={styles.input} name="dodatek">
              <option disabled value="">
                Wybierz dodatek
              </option>
              {dodatek.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Field>
          </label>
          <label className={styles.label}>
            <span>Date: </span>
            <Field name="date">
              {({ form }) => {
                return (
                  <Flatpickr
                    className={styles.input}
                    placeholder="Booking date"
                    options={{
                      enableTime: false,
                      dateFormat: "Y-m-d",
                      minDate: "today",
                      disable: [],
                    }}
                    onChange={(date) => {
                      form.setFieldValue("date", date[0]);
                      setSelectedDate(date[0]);
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
          {availableTimes.length > 0 ? (
            <label className={styles.label}>
              <span>Time: </span>
              <Field
                as="select"
                className={styles.input}
                name="time"
                type="time"
              >
                <option disabled value="">
                  Select time
                </option>
                {availableTimes.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                className={styles.errorMessage}
                name="time"
                component="span"
              />
            </label>
          ) : (
            <p className={styles.loading}>Завантаження часу...</p>
          )}
          <button className={styles.button} type="submit" disabled={isLoading}>
            {isLoading ? "Adding Booking..." : "Booking"}
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default BookingForm;
