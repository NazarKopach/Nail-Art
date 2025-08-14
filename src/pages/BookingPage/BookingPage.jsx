import BookingForm from "../../components/BookingForm/BookingForm";
import BookingServices from "../../components/BookingServices/BookingServices";
import Price from "../../components/Price/Price";
import styles from "./BookingPage.module.css";

const BookingPage = () => {
  return (
    <div className={styles.booking_page_div}>
      <BookingServices />
    </div>
  );
};

export default BookingPage;
