import BookingForm from "../../components/BookingForm/BookingForm";
import Price from "../../components/Price/Price";
import styles from "./BookingPage.module.css";

const BookingPage = () => {
  return (
    <div className={styles.booking_page_div}>
      <Price />
      <BookingForm />
    </div>
  );
};

export default BookingPage;
