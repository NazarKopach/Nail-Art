//////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import { useState, useEffect } from "react";
// // import FullCalendar from "@fullcalendar/react";
// // import dayGridPlugin from "@fullcalendar/daygrid";
// // import timeGridPlugin from "@fullcalendar/timegrid";
// // import interactionPlugin from "@fullcalendar/interaction"; // якщо потрібен клік

// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";

// const BookingForm = () => {
//   const [date, setDate] = useState(new Date());
//   const [time, setTime] = useState("");
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [bookings, setBookings] = useState([]);

//   console.log(bookings);

//   const timeslots = ["10:00", "11:00", "12:00", "14:00", "15:00", "16:00"];

//   useEffect(() => {
//     fetch("http://localhost:3000/bookings")
//       .then((res) => res.json())
//       .then((data) => setBookings(data));
//   }, []);

//   const handleSubmit = async () => {
//     const booking = {
//       clientName: name,
//       clientEmail: email,
//       date: date.toISOString().split("T")[0],
//       time,
//     };

//     const res = await fetch("http://localhost:3000/bookings", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(booking),
//     });

//     if (res.ok) {
//       alert("Бронювання успішне!");
//       setBookings([...bookings, booking]);
//     } else {
//       alert("Цей час уже заброньований");
//     }
//   };

//   const isSlotBooked = (d, t) => {
//     if (Array.isArray(bookings)) {
//       const day = d.toISOString().split("T")[0];
//       return bookings.find((b) => b.date === day && b.time === t);
//     }
//   };

//   return (
//     <div className="p-4">
//       <h2>Бронювання</h2>
//       <Calendar
//         onChange={setDate}
//         value={date}
//         tileClassName={({ date, view }) => {
//           if (view === "month" && Array.isArray(bookings)) {
//             const day = date.toISOString().split("T")[0];
//             const hasBooking = bookings.some((b) => b.date === day);
//             return hasBooking ? "booked-day" : null;
//           }
//           return null;
//         }}
//       />
//       <div>
//         <h4>Час:</h4>
//         {timeslots.map((slot) => (
//           <button
//             key={slot}
//             onClick={() => setTime(slot)}
//             disabled={isSlotBooked(date, slot)}
//             style={{
//               margin: "4px",
//               background: time === slot ? "green" : "lightgray",
//               color: isSlotBooked(date, slot) ? "gray" : "black",
//             }}
//           >
//             {slot}
//           </button>
//         ))}
//       </div>
//       <input
//         placeholder="Ім'я"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />
//       <input
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <button onClick={handleSubmit}>Забронювати</button>
//     </div>
//   );
// };

// export default BookingForm;

///////////////////////////////////////////////////////////////////////////////

import { useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useDispatch, useSelector } from "react-redux";
import { allBookings } from "../../redux/booking/selectors";
import { fetchAllBookings } from "../../redux/booking/operations";
import styles from "./Calendar.module.css";

export default function MyCalendar() {
  const dispatch = useDispatch();
  const bookings = useSelector(allBookings);

  const handleDateClick = (arg) => {
    alert(arg.dateStr);
  };

  const handleEventClick = (info) => {
    alert(
      `Подія: ${info.event.title}\nЧас: ${info.event.extendedProps.description}`
    );
  };

  const events = bookings.map((b) => ({
    id: b._id?.toString(),
    title: b.userId.name,
    start: b.date,
    editable: true,
    backgroundColor: "black",
    className: styles.important_event,
    extendedProps: {
      description: b.dodatek,
      coment: b.time,
    },
  }));

  useEffect(() => {
    dispatch(fetchAllBookings());
  }, [dispatch]);

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={events}
      displayEventTime={false}
      dateClick={handleDateClick}
      eventClick={handleEventClick}
      eventContent={(arg) => {
        return {
          html: `
            <div>
              <b>${arg.event.title}</b>
              <div class='calendar_dodatek'>
                ${arg.event.extendedProps.description || ""}
              </div>
              <div class='calendar_dodatek'>
                ${arg.event.extendedProps.coment || ""}
              </div>
            </div>
          `,
        };
      }}
    />
  );
}
