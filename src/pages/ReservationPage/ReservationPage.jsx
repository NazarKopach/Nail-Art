import BookingForm from "../../components/BookingForm/BookingForm";
import styles from "./ReservationPage.module.css";

const ReservationPage = () => {
  return (
    <div className={styles.reservation_page_div}>
      <BookingForm />
    </div>
  );
};

export default ReservationPage;
