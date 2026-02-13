import { useLocation } from "react-router-dom";
import BookingForm from "../../components/BookingForm/BookingForm";
import BookingUpdate from "../../components/BookingUpdate/BookingUpdate";
import styles from "./ReservationPage.module.css";

const ReservationPage = () => {
  const { state } = useLocation();
  const id = state?.id;

  return (
    <div className={styles.reservation_page_div}>
      {id ? <BookingUpdate id={id} /> : <BookingForm />}
    </div>
  );
};

export default ReservationPage;
