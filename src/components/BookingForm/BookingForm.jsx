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
                  {({ form, field }) => (
                    <Flatpickr
                      className={styles.input}
                      placeholder="Booking date"
                      options={{
                        enableTime: false,
                        dateFormat: "Y-m-d",
                        minDate: "today",
                        disable: fullyBookedDates,
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

              <label className={styles.label}>
                <span>Time: </span>
                <Field
                  as="select"
                  className={styles.input}
                  name="time"
                  type="time"
                  disabled={!values.date || availableTimes.length === 0}
                >
                  <option disabled value="">
                    {values.date ? "Select time" : "First pick a date"}
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

// import styles from "./BookingForm.module.css";
// import { ErrorMessage, Field, Form, Formik } from "formik";
// import { addBookingSchema } from "../../utils/schemas";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   addBookings,
//   fetchAllBookings,
//   fetchReservedBookings,
// } from "../../redux/booking/operations";
// import {
//   allBookings,
//   isBookingsLoading,
//   reservedDate,
// } from "../../redux/booking/selectors";
// import { toast } from "react-toastify";
// import Flatpickr from "react-flatpickr";
// import "flatpickr/dist/flatpickr.min.css";
// import { useEffect } from "react";

// const initialValues = {
//   clientName: "",
//   phoneNumber: "",
//   serviceType: "",
//   dodatek: "",
//   time: "",
//   date: "",
// };

// const BookingForm = () => {
//   const dispatch = useDispatch();
//   const isLoading = useSelector(isBookingsLoading);
//   const dataBookings = useSelector(allBookings);
//   const reserved = useSelector(reservedDate);
//   console.log(reserved);
//   const time = ["9:00", "11:00", "13:00", "15:00", "17:00"];
//   const dodatek = [
//     "Zdobienia",
//     "Przedluzenie 1 paznokcia",
//     "French",
//     "Usuwanie materialu",
//   ];
//   const services = [
//     "Manicure hybrydowy",
//     "Zel(krotki)",
//     "Zel(srednia dlugosc od 1)",
//     "Zel(dlugie od 2)",
//     "Przedluzanie (do 3)",
//     "Przedluzanie (od 3)",
//   ];

//   useEffect(() => {
//     dispatch(fetchReservedBookings());
//   }, [dispatch]);

//   // const reservation = dataBookings.map((item) => {
//   //   const dateObj = new Date(item.date);
//   //   const isValidDate = !isNaN(dateObj.getTime());

//   //   const reservedDate = isValidDate
//   //     ? dateObj.toISOString().slice(0, 10)
//   //     : null;

//   //   return {
//   //     date: reservedDate,
//   //     time: item.time || null,
//   //   };
//   // });

//   // console.log(reservation);

//   const fullyBookedDates = time
//     ? [
//         ...new Set(
//           reserved
//             .filter((res) => {
//               const count = reserved.filter((r) => r.date === res.date).length;
//               return count >= time.length;
//             })
//             .map((res) => res.date)
//         ),
//       ]
//     : [];

//   const handleSubmit = async (values, actions) => {
//     try {
//       await dispatch(addBookings(values)).unwrap();
//       toast.success("Successfuly add booking!");
//       actions.resetForm();
//     } catch (err) {
//       toast.error(err.message || "Something went wrong...");
//     }
//   };

//   return (
//     <div className={styles.contact_form_div}>
//       <Formik
//         initialValues={initialValues}
//         validationSchema={addBookingSchema}
//         onSubmit={handleSubmit}
//       >
//         {({ values }) => {
//           let availableTimes = time;
//           if (values.date) {
//             const formattedDate = new Date(values.date)
//               .toISOString()
//               .split("T")[0];
//             availableTimes = time.filter(
//               (t) =>
//                 !reserved.some(
//                   (res) => res.date === formattedDate && res.time === t
//                 )
//             );
//             console.log(formattedDate);
//           }

//           return (
//             <Form className={styles.form}>
//               <label className={styles.label}>
//                 <span>Name: </span>
//                 <Field
//                   type="text"
//                   name="clientName"
//                   className={styles.input}
//                   placeholder="Name"
//                 />
//                 <ErrorMessage
//                   className={styles.errorMessage}
//                   name="clientName"
//                   component="span"
//                 />
//               </label>

//               <label className={styles.label}>
//                 <span>Number: </span>
//                 <Field
//                   className={styles.input}
//                   name="phoneNumber"
//                   type="tel"
//                   placeholder="+48*******"
//                 />
//                 <ErrorMessage
//                   className={styles.errorMessage}
//                   name="phoneNumber"
//                   component="span"
//                 />
//               </label>

//               <label className={styles.label}>
//                 <span>Service: </span>
//                 <Field as="select" className={styles.input} name="serviceType">
//                   <option disabled value="">
//                     Select service
//                   </option>
//                   {services.map((service) => (
//                     <option key={service} value={service}>
//                       {service}
//                     </option>
//                   ))}
//                 </Field>
//                 <ErrorMessage
//                   className={styles.errorMessage}
//                   name="serviceType"
//                   component="span"
//                 />
//               </label>

//               <label className={styles.label}>
//                 <span>Dodatkowo:</span>
//                 <Field as="select" className={styles.input} name="dodatek">
//                   <option disabled value="">
//                     Wybierz dodatek
//                   </option>
//                   {dodatek.map((item) => (
//                     <option key={item} value={item}>
//                       {item}
//                     </option>
//                   ))}
//                 </Field>
//               </label>

//               <label className={styles.label}>
//                 <span>Date: </span>
//                 <Field name="date">
//                   {({ form, field }) => (
//                     <Flatpickr
//                       className={styles.input}
//                       placeholder="Booking date"
//                       options={{
//                         enableTime: false,
//                         dateFormat: "Y-m-d",
//                         minDate: "today",
//                         disable: fullyBookedDates,
//                       }}
//                       value={field.value}
//                       onChange={(date) => form.setFieldValue("date", date[0])}
//                     />
//                   )}
//                 </Field>
//                 <ErrorMessage
//                   className={styles.errorMessage}
//                   name="date"
//                   component="span"
//                 />
//               </label>

//               <label className={styles.label}>
//                 <span>Time: </span>
//                 <Field
//                   as="select"
//                   className={styles.input}
//                   name="time"
//                   type="time"
//                   disabled={!values.date || availableTimes.length === 0}
//                 >
//                   <option disabled value="">
//                     {values.date ? "Select time" : "First pick a date"}
//                   </option>
//                   {availableTimes.map((time) => (
//                     <option key={time} value={time}>
//                       {time}
//                     </option>
//                   ))}
//                 </Field>
//                 <ErrorMessage
//                   className={styles.errorMessage}
//                   name="time"
//                   component="span"
//                 />
//               </label>

//               <button
//                 className={styles.button}
//                 type="submit"
//                 disabled={isLoading}
//               >
//                 {isLoading ? "Adding Booking..." : "Booking"}
//               </button>
//             </Form>
//           );
//         }}
//       </Formik>
//     </div>
//   );
// };

// export default BookingForm;
