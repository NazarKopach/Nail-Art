import { NavLink } from "react-router-dom";

import styles from "./Navigation.module.css";
import clsx from "clsx";

const Navigation = ({ closeModal, wrapperClass, linkClass }) => {
  const buildCssClasses = ({ isActive }) =>
    clsx(styles.link, linkClass, isActive && styles.active);

  return (
    <nav className={clsx(styles.nav_wrapper, wrapperClass)}>
      <NavLink to="/home" className={buildCssClasses} onClick={closeModal}>
        Home
      </NavLink>
      <NavLink to="/booking" className={buildCssClasses} onClick={closeModal}>
        Booking
      </NavLink>
      <NavLink to="/gallery" className={buildCssClasses} onClick={closeModal}>
        Gallery
      </NavLink>
      <NavLink to="/catalog" className={buildCssClasses} onClick={closeModal}>
        Catalog
      </NavLink>
      {/* <NavLink
        to="/admin-calendar"
        className={buildCssClasses}
        onClick={closeModal}
      >
        Calendar
      </NavLink> */}
    </nav>
  );
};

export default Navigation;
