import { Link } from "react-router-dom";
import { Icon } from "../Icon/Icon";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footer_wrapper}>
      <div className={styles.footer_logo_wrapper}>
        <p className={styles.footer_logo}>
          <span className={styles.footer_logo_span}>Nail</span>Artist
        </p>
      </div>
      <div className={styles.footer_icon_wrapper}>
        <a className={styles.footer_link} href="https://www.youtube.com/">
          <Icon
            id="icon-instagram"
            width="30"
            height="30"
            className={styles.footer_icon}
          />
        </a>
        <a className={styles.footer_link} href="mailto:ya.mariana25@gmail.com">
          <Icon
            id="icon-mail4"
            width="30"
            height="30"
            className={styles.footer_icon}
          />
        </a>
        <a className={styles.footer_link} href="tel:+386564654654">
          <Icon
            id="icon-phone"
            width="30"
            height="30"
            className={styles.footer_icon}
          />
        </a>
      </div>
    </div>
  );
};

export default Footer;
