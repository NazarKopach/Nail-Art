import { NavLink } from "react-router-dom";

import styles from "./Navigation.module.css";
import clsx from "clsx";

const buildCssClasses = ({ isActive }) =>
  clsx(styles.link, isActive && styles.active);

const Navigation = () => {
  return (
    <nav className={styles.nav_wrapper}>
      <NavLink to="/booking" className={buildCssClasses}>
        Home
      </NavLink>
      <NavLink to="/catalog" className={buildCssClasses}>
        Booking
      </NavLink>
    </nav>
  );
};

export default Navigation;
