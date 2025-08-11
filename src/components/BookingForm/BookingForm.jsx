import styles from "./BookingForm.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { addBookingSchema } from "../../utils/schemas";
import { useDispatch, useSelector } from "react-redux";
import { addBookings, fetchAllBookings } from "../../redux/booking/operations";
import { allBookings, isBookingsLoading } from "../../redux/booking/selectors";
import { toast } from "react-toastify";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { useEffect } from "react";
import CustomSelect from "../CustomSelect/CustomSelect";

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

  useEffect(() => {
    dispatch(fetchAllBookings());
  }, [dispatch]);

  const reservation = dataBookings.map((item) => {
    const dateObj = new Date(item.date);
    const isValidDate = !isNaN(dateObj.getTime());

    const reservedDate = isValidDate
      ? dateObj.toISOString().slice(0, 10)
      : null;

    return {
      date: reservedDate,
      time: item.time || null,
    };
  });

  const fullyBookedDates = time
    ? [
        ...new Set(
          dataBookings
            .filter((res) => {
              const count = dataBookings.filter(
                (r) => r.date === res.date
              ).length;
              return count >= time.length;
            })
            .map((res) => res.date)
        ),
      ]
    : [];

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
        {({ values }) => {
          let availableTimes = time;
          if (values.date) {
            const formattedDate = new Date(values.date)
              .toISOString()
              .split("T")[0];
            availableTimes = time.filter(
              (t) =>
                !reservation.some(
                  (res) => res.date === formattedDate && res.time === t
                )
            );
          }

          return (
            <Form className={styles.form}>
              <CustomSelect
                label="Service:"
                name="serviceType"
                options={services}
                selectOption={"Select service"}
              />
              <CustomSelect
                label="Dodatkowo:"
                name="dodatek"
                options={dodatek}
                selectOption={"Wybierz dodatek"}
              />
              <label className={styles.label}>
                <span>Date: </span>
                <Field name="date">
                  {({ form, field }) => (
                    <Flatpickr
                      className={styles.input}
                      placeholder="Booking date"
                      options={{
                        enableTime: false,
                        dateFormat: "Y-m-d",
                        minDate: "today",
                        disable: fullyBookedDates,
                        position: "auto left",
                      }}
                      value={field.value}
                      onChange={(date) => form.setFieldValue("date", date[0])}
                    />
                  )}
                </Field>
                <ErrorMessage
                  className={styles.errorMessage}
                  name="date"
                  component="span"
                />
              </label>
              {values.date && (
                <CustomSelect
                  label="Time:"
                  name="time"
                  options={availableTimes}
                  selectOption={
                    values.date ? "Select time" : "First pick a date"
                  }
                />
              )}
              <button
                className={styles.button}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Adding Booking..." : "Booking"}
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default BookingForm;
