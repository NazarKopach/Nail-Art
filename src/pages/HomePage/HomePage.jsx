import Footer from "../../components/Footer/Footer";
import styles from "./HomePage.module.css";
import { Link } from "react-router-dom";
import { useLayoutEffect } from "react";
import gsap from "gsap";

const HomePage = () => {
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(`.${styles.home_page_title}`, {
        opacity: 0,
        y: -100,
        duration: 1,
        ease: "power3.out",
      }).from(
        `.${styles.home_page_button}`,
        { opacity: 0, y: 50, duration: 1, ease: "power3.out" },
        "-=0.5"
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div>
      <div className={styles.home_page_container}>
        <h1 className={styles.home_page_title}>
          <span className={styles.home_page_span}>Nail</span>ArtWpr
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
