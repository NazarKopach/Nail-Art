import styles from "./HomePage.module.css";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className={styles.homePageContainer}>
      <h1>NailArt</h1>
      <button type="button" className={styles.home_page_button}>
        <Link className={styles.home_page_button_link} to={"/booking"}>
          Booking
        </Link>
      </button>
    </div>
  );
};

export default HomePage;
