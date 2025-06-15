import React, { useEffect, useState } from "react";
import styles from "./Calendar.module.css";
import { useSelector } from "react-redux";
import { allBookings } from "../../redux/booking/selectors";

const Calendar = () => {
  const booking = useSelector(allBookings);

  useEffect(() => {
    fetch("http://localhost:3000/bookings")
      .then((res) => res.json())
      .then((data) => {
        const userBookings = data.bookings;
        setBooking(userBookings);
      });
  }, []);

  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndexRaw = new Date(year, month, 1).getDay();
  const firstDayIndex = firstDayIndexRaw === 0 ? 6 : firstDayIndexRaw - 1;

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleDateClick = (day) => {
    alert(`Вибрано дату: ${day}.${month + 1}.${year}`);
  };

  const days = [];
  for (let i = 0; i < firstDayIndex; i++) {
    days.push(
      <div key={`empty-${i}`} className={`${styles.day} ${styles.empty}`} />
    );
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(
      <div
        key={i}
        onClick={() => handleDateClick(i)}
        className={`${styles.day} ${styles.active}`}
      >
        {i}
        {/* <ul className={styles.calendar_list}>
          {booking.map((booking) => (
            <li key={booking._id} className={styles.calendar_item}>
              <p>
                🕐 {booking.clientName} {booking.clientEmail}
              </p>
              <p>
                {booking.date} {booking.time}
              </p>
            </li>
          ))}
        </ul> */}
      </div>
    );
  }

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <button onClick={prevMonth}>&larr;</button>
        <h2>
          {currentDate.toLocaleString("uk-UA", { month: "long" })} {year}
        </h2>
        <button onClick={nextMonth}>&rarr;</button>
      </div>
      <div className={styles.grid}>
        {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"].map((d) => (
          <div key={d} className={styles.dayName}>
            {d}
          </div>
        ))}
        {days}
      </div>
    </div>
  );
};

export default Calendar;

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

// import React, { useEffect, useState } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";

// export default function BookingCalendar() {
//   const [events, setEvents] = useState([]);
//   const [bookings, setBookings] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:3000/bookings")
//       .then((res) => res.json())
//       .then((data) => {
//         if (Array.isArray(data)) {
//           const formatted = data.map((b) => ({
//             title: b.clientName,
//             start: `${b.date}T${b.time}`,
//           }));
//           setEvents(formatted);
//           setBookings(formatted);
//         }
//       });
//   }, []);

//   const handleDateClick = async (info) => {
//     const clientName = prompt("Ім'я клієнта:");
//     const time = prompt("О котрій годині? (формат HH:MM, напр. 14:30)");

//     if (!clientName || !time) return;

//     const date = info.dateStr;
//     const newBooking = { clientName, date, time };

//     const res = await fetch("http://localhost:3000/bookings", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(newBooking),
//     });

//     if (res.ok) {
//       setEvents((prev) => [
//         ...prev,
//         {
//           title: clientName,
//           start: `${date}T${time}`,
//         },
//       ]);
//     }
//   };

//   return (
//     <FullCalendar
//       plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//       initialView="dayGridMonth"
//       dateClick={handleDateClick}
//       events={bookings}
//       headerToolbar={{
//         left: "prev,next today",
//         center: "title",
//         right: "dayGridMonth,timeGridWeek,timeGridDay",
//       }}
//       eventClick={(info) => {
//         alert(`Резервація: ${info.event.title}\nЧас: ${info.event.start}`);
//       }}
//     />
//   );
// }
