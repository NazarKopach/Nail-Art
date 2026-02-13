import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reservedDate } from "../../redux/booking/selectors";
import {
  addBookings,
  fetchReservedBookings,
  fetchUserBookings,
} from "../../redux/booking/operations";
import { toast } from "react-toastify";

import DodatekModal from "../DodatekModal/DodatekModal";
import styles from "./BookingUpdate.module.css";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import "dayjs/locale/pl"; // імпортуємо польську локалізацію
import {
  clearAllReservationDodatek,
  clearReservationDodatek,
} from "../../redux/reservDodatek/slice";
dayjs.extend(isoWeek);

const BookingUpdate = (id) => {
  const reserv = id.id;
  console.log(reserv);
  const location = useLocation();
  const { price } = location.state || {};
  const [modalIsOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [optionPrice, setOptionPrice] = useState("");
  const [value, setValue] = useState(price);
  const [activeTime, setActiveTime] = useState(null);
  const [activeDate, setActiveDate] = useState("");
  const [currentDate, setCurrentDate] = useState(dayjs());
  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");
  const startDay = startOfMonth.isoWeekday();
  const daysInMonth = endOfMonth.date();

  const reservations = useSelector(reservedDate);

  const reservDodatek = useSelector((state) => state.reservationDodatek);
  const reservDodatekItem = reservDodatek.map((item) => item.servicesDodatek);

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
      serviceType: reserv.services,
      dodatek: reservDodatekItem,
      time: time,
      date: date,
    };
    try {
      await dispatch(addBookings(data)).unwrap();
      toast.success("Successfuly add booking!");
      dispatch(fetchUserBookings());
      dispatch(clearAllReservationDodatek());
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
          <img src={reserv.src} width="40" height="40" />{" "}
          {`${reserv.serviceType} ${reserv.price} zl`}{" "}
        </p>
        {reservDodatek.map((dodatek) => (
          <p
            key={dodatek.servicesDodatek}
            className={styles.booking_calendar_service}
          >
            <img src={dodatek.srcDodatek} width="40" height="40" />
            {dodatek.servicesDodatek} {dodatek.priceDodatek} zl{" "}
            <button
              className={styles.booking_calendar_option_delete}
              onClick={() =>
                dispatch(clearReservationDodatek(dodatek.idDodatek))
              }
            >
              del
            </button>
          </p>
        ))}
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
                (setTime(t), setActiveTime(t));
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

export default BookingUpdate;
