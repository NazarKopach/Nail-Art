import Footer from "../../components/Footer/Footer";
import Slider from "../../components/slider/slider";
import styles from "./HomePage.module.css";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <div className={styles.homePageContainer}>
        <Slider />
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
