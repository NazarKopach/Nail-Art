import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reservedDate } from "../../redux/booking/selectors";
import {
  addBookings,
  fetchReservedBookings,
} from "../../redux/booking/operations";
import { toast } from "react-toastify";

import DodatekModal from "../DodatekModal/DodatekModal";
import styles from "./BookingForm.module.css";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import "dayjs/locale/pl"; // імпортуємо польську локалізацію
dayjs.extend(isoWeek);

const BookingForm = () => {
  const location = useLocation();
  const { price, type } = location.state || {};
  const [modalIsOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [option, setOption] = useState("");
  const [optionPrice, setOptionPrice] = useState("");
  const [value, setValue] = useState(price);
  const [services, setServices] = useState(type);
  const [activeTime, setActiveTime] = useState(null);
  const [activeDate, setActiveDate] = useState("");
  const [currentDate, setCurrentDate] = useState(dayjs());
  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");
  const startDay = startOfMonth.isoWeekday();
  const daysInMonth = endOfMonth.date();

  const reservations = useSelector(reservedDate);
  const reserv = useSelector((state) => state.reservation);
  console.log(reserv);

  const dodatek = [
    { id: "1", value: "Zdobienia", price: "10" },
    { id: "2", value: "Przedluzenie 1 paznokcia", price: "10" },
    { id: "3", value: "French", price: "30" },
    { id: "4", value: "Usuwanie materialu", price: "10" },
  ];

  const days = [];
  for (let i = 1; i < startDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchReservedBookings());
    setValue(Number(price) + (optionPrice ? Number(optionPrice) : 0));
  }, [dispatch, optionPrice, price]);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleSubmit = async () => {
    const data = {
      serviceType: type,
      dodatek: option,
      time: time,
      date: date,
    };
    try {
      await dispatch(addBookings(data)).unwrap();
      toast.success("Successfuly add booking!");

      closeModal();
    } catch (err) {
      toast.error(err.message || "Something went wrong...");
    }
  };

  // const resDates = reservations.map((item) => {
  //   if (date.includes(item.date)) {
  //     return item.date;
  //   }
  // });

  const resTime = reservations.map((item) => {
    if (date.includes(item.date)) {
      return item.time;
    }
  });

  const blockPrevData = () => {
    const now = dayjs();
    const prevMonth = currentDate.subtract(1, "month");
    if (prevMonth.isBefore(now.startOf("month"))) return;
    setCurrentDate(prevMonth);
  };

  return (
    <div className={styles.booking_form_div}>
      <div className={styles.booking_calendar_month}>
        <button onClick={blockPrevData}>←</button>
        <h2>{currentDate.format("MMMM YYYY")}</h2>
        <button onClick={() => setCurrentDate(currentDate.add(1, "month"))}>
          →
        </button>
      </div>
      <div className={styles.booking_calendar_days}>
        {["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map((d) => (
          <div key={d}>{d}</div>
        ))}
        {days.map((d, idx) => {
          if (!d) return <div key={idx}></div>; // пропускаємо пусті клітинки

          const dayDate = currentDate.date(d); // створюємо дату для цього дня
          const isPast = dayDate.isBefore(dayjs(), "day"); // чи день вже минув

          return (
            <div
              key={idx}
              className={`${styles.booking_calendar_day} 
        ${activeDate === d ? styles.active_calendar_day : ""} 
        ${isPast ? styles.disabled_day : ""}`} // додаємо новий стиль
              onClick={() => {
                if (!isPast) {
                  setDate(dayDate.format("YYYY-MM-DD"));
                  setActiveDate(d);
                }
              }}
            >
              {d}
            </div>
          );
        })}
      </div>
      <div className={styles.booking_calendar_service_div}>
        <p className={styles.booking_calendar_service}>
          {`${services} ${value} zl`}{" "}
        </p>
        {option && (
          <p className={styles.booking_calendar_service}>
            {option} {optionPrice} zl{" "}
            <button
              className={styles.booking_calendar_option_delete}
              onClick={() => {
                setOption(""), setOptionPrice("");
              }}
            >
              del
            </button>
          </p>
        )}
      </div>

      <button className={styles.booking_add_option} onClick={() => openModal()}>
        dodaj dodatek+
      </button>
      {date.length !== 0 && (
        <div className={styles.booking_calendar_time}>
          {["9:00", "11:00", "13:00", "15:00", "17:00"].map((t) => (
            <button
              key={t}
              disabled={resTime.includes(t)} // блокуємо вже зайняті
              onClick={() => {
                setTime(t), setActiveTime(t);
              }}
              className={`${styles.booking_time_btn} ${
                activeTime === t ? styles.active_time_btn : ""
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      )}
      <button type="submit" onClick={() => handleSubmit()}>
        booking
      </button>
      <DodatekModal modalIsOpen={modalIsOpen} closeModal={closeModal} />
    </div>
  );
};

export default BookingForm;

////////////////////////// optin 2/////////////////

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

// const BookingForm = ({ id, closeModal, type, price }) => {
//   const dispatch = useDispatch();
//   const isLoading = useSelector(isBookingsLoading);
//   const dataBookings = useSelector(allBookings);

//   const time = [
//     { id: "1", value: "9:00" },
//     { id: "2", value: "11:00" },
//     { id: "3", value: "13:00" },
//     { id: "4", value: "15:00" },
//     { id: "5", value: "17:00" },
//   ];

//   const dodatek = [
//     { id: "1", value: "Zdobienia", price: "10" },
//     { id: "2", value: "Przedluzenie 1 paznokcia", price: "10" },
//     { id: "3", value: "French", price: "30" },
//     { id: "4", value: "Usuwanie materialu", price: "10" },
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

//       closeModal();
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
//         initialValues={{ serviceType: type, dodatek: "", time: "", date: "" }}
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
//               <label className={styles.label}>
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
//                         inline: true,
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
//               <CustomSelect
//                 label="Dodatkowo:"
//                 name="dodatek"
//                 options={dodatek}
//                 selectOption={"Wybierz dodatek"}
//               />
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
//               <p>Price:{price} zl</p>
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
