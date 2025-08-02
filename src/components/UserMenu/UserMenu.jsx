import { useDispatch } from "react-redux";
import { apiLogoutUser } from "../../redux/auth/operations";
import { Icon } from "../Icon/Icon.jsx";
import { useState } from "react";

import MobileMenu from "../MobileMenu/MobileMenu.jsx";
import styles from "./UserMenu.module.css";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(20, 20, 20, 0.6)",
    overflowX: "hidden",
    zIndex: 1000,
  },
  content: {
    top: "0",
    left: "auto",
    right: "0",
    bottom: "0",
    width: "50vw",
    padding: "34px",
    border: "none",
    borderRadius: "0",
    backgroundColor: "#e980d4",
  },
};

const UserMenu = () => {
  const dispatch = useDispatch();

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const onLogout = () => {
    dispatch(apiLogoutUser());
  };

  return (
    <div>
      <button className={styles.user_menu_btn} onClick={onLogout}>
        Logout
      </button>
      <Icon
        id="icon-burger"
        width="40"
        height="40"
        className={styles.mobile_icon}
        onClick={openModal}
      />
      <MobileMenu
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        customStyles={customStyles}
      />
    </div>
  );
};

export default UserMenu;
