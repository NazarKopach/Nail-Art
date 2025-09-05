import Footer from "../../components/Footer/Footer";
import styles from "./HomePage.module.css";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <div className={styles.home_page_container}>
        <h1 className={styles.home_page_title}>
          <span className={styles.home_page_span}>Nail</span>Art
        </h1>
        <button type="button" className={styles.home_page_button}>
          <Link className={styles.home_page_button_link} to={"/booking"}>
            Booking
          </Link>
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
