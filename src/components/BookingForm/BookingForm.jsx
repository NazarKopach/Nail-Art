import styles from "./BookingForm.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { addBookingSchema } from "../../utils/schemas";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { allBookings, isBookingsLoading } from "../../redux/booking/selectors";
import { toast } from "react-toastify";
import {
  addBookings,
  fetchAllBookings,
  fetchUserBookings,
  patchBooking,
} from "../../redux/booking/operations";

import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import CustomSelect from "../CustomSelect/CustomSelect";

const BookingForm = ({ id, closeModal, type, price }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(isBookingsLoading);
  const dataBookings = useSelector(allBookings);

  const time = [
    { id: "1", value: "9:00" },
    { id: "2", value: "11:00" },
    { id: "3", value: "13:00" },
    { id: "4", value: "15:00" },
    { id: "5", value: "17:00" },
  ];

  const dodatek = [
    { id: "1", value: "Zdobienia", price: "10" },
    { id: "2", value: "Przedluzenie 1 paznokcia", price: "10" },
    { id: "3", value: "French", price: "30" },
    { id: "4", value: "Usuwanie materialu", price: "10" },
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

      closeModal();
    } catch (err) {
      toast.error(err.message || "Something went wrong...");
    }
  };

  const handleUpdateSubmit = async (id, values, actions) => {
    try {
      await dispatch(
        patchBooking({
          id,
          partialData: values,
        })
      ).unwrap();
      toast.success("Successfuly update booking!");
      actions.resetForm();

      closeModal();

      dispatch(fetchUserBookings());
    } catch (err) {
      toast.error(err.message || "Something went wrong...");
    }
  };

  return (
    <div className={styles.contact_form_div}>
      <Formik
        initialValues={{ serviceType: type, dodatek: "", time: "", date: "" }}
        validationSchema={addBookingSchema}
        onSubmit={(values, actions) => {
          if (id) {
            return handleUpdateSubmit(id, values, actions);
          }
          return handleSubmit(values, actions);
        }}
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
                <Field name="date">
                  {({ form, field }) => (
                    <Flatpickr
                      className={styles.input}
                      placeholder="Booking date"
                      options={{
                        enableTime: false,
                        dateFormat: "Y-m-d",
                        altInput: true,
                        altFormat: "d.m.Y",
                        minDate: "today",
                        disable: fullyBookedDates,
                        inline: true,
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
              <CustomSelect
                label="Dodatkowo:"
                name="dodatek"
                options={dodatek}
                selectOption={"Wybierz dodatek"}
              />
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
              <p>Price:{price} zl</p>
              <button
                className={styles.button}
                type="submit"
                disabled={isLoading}
              >
                {isLoading
                  ? id
                    ? "Updating..."
                    : "Adding..."
                  : id
                  ? "Update"
                  : "Booking"}
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default BookingForm;

// option 1 //

// import styles from "./BookingForm.module.css";
// import { ErrorMessage, Field, Form, Formik } from "formik";
// import { addBookingSchema } from "../../utils/schemas";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import { allBookings, isBookingsLoading } from "../../redux/booking/selectors";
// import { toast } from "react-toastify";
// import {
//   addBookings,
//   fetchAllBookings,
//   fetchUserBookings,
//   patchBooking,
// } from "../../redux/booking/operations";

// import Flatpickr from "react-flatpickr";
// import "flatpickr/dist/flatpickr.min.css";
// import CustomSelect from "../CustomSelect/CustomSelect";

// const initialValues = {
//   clientName: "",
//   phoneNumber: "",
//   serviceType: "",
//   dodatek: "",
//   time: "",
//   date: "",
// };

// const BookingForm = ({ id, closeModal }) => {
//   const dispatch = useDispatch();
//   const isLoading = useSelector(isBookingsLoading);
//   const dataBookings = useSelector(allBookings);
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
//     dispatch(fetchAllBookings());
//   }, [dispatch]);

//   const reservation = dataBookings.map((item) => {
//     const dateObj = new Date(item.date);
//     const isValidDate = !isNaN(dateObj.getTime());

//     const reservedDate = isValidDate
//       ? dateObj.toISOString().slice(0, 10)
//       : null;

//     return {
//       date: reservedDate,
//       time: item.time || null,
//     };
//   });

//   const fullyBookedDates = time
//     ? [
//         ...new Set(
//           dataBookings
//             .filter((res) => {
//               const count = dataBookings.filter(
//                 (r) => r.date === res.date
//               ).length;
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

//   const handleUpdateSubmit = async (id, values, actions) => {
//     try {
//       await dispatch(
//         patchBooking({
//           id,
//           partialData: values,
//         })
//       ).unwrap();
//       toast.success("Successfuly update booking!");
//       actions.resetForm();

//       closeModal();

//       dispatch(fetchUserBookings());
//     } catch (err) {
//       toast.error(err.message || "Something went wrong...");
//     }
//   };

//   return (
//     <div className={styles.contact_form_div}>
//       <Formik
//         initialValues={initialValues}
//         validationSchema={addBookingSchema}
//         onSubmit={(values, actions) => {
//           if (id) {
//             return handleUpdateSubmit(id, values, actions);
//           }
//           return handleSubmit(values, actions);
//         }}
//       >
//         {({ values }) => {
//           let availableTimes = time;
//           if (values.date) {
//             const formattedDate = new Date(values.date)
//               .toISOString()
//               .split("T")[0];
//             availableTimes = time.filter(
//               (t) =>
//                 !reservation.some(
//                   (res) => res.date === formattedDate && res.time === t
//                 )
//             );
//           }

//           return (
//             <Form className={styles.form}>
//               <CustomSelect
//                 label="Service:"
//                 name="serviceType"
//                 options={services}
//                 selectOption={"Select service"}
//               />
//               <CustomSelect
//                 label="Dodatkowo:"
//                 name="dodatek"
//                 options={dodatek}
//                 selectOption={"Wybierz dodatek"}
//               />
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
//                         altInput: true,
//                         altFormat: "d.m.Y",
//                         minDate: "today",
//                         disable: fullyBookedDates,
//                         position: "auto left",
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
//               {values.date && (
//                 <CustomSelect
//                   label="Time:"
//                   name="time"
//                   options={availableTimes}
//                   selectOption={
//                     values.date ? "Select time" : "First pick a date"
//                   }
//                 />
//               )}
//               <button
//                 className={styles.button}
//                 type="submit"
//                 disabled={isLoading}
//               >
//                 {isLoading
//                   ? id
//                     ? "Updating..."
//                     : "Adding..."
//                   : id
//                   ? "Update"
//                   : "Booking"}
//               </button>
//             </Form>
//           );
//         }}
//       </Formik>
//     </div>
//   );
// };

// export default BookingForm;
