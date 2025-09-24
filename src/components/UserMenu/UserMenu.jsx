import { useDispatch, useSelector } from "react-redux";
import {
  apiGetCurrentUserInfo,
  apiLogoutUser,
} from "../../redux/auth/operations";
import { Icon } from "../Icon/Icon.jsx";
import { useEffect, useState } from "react";
import MobileMenu from "../MobileMenu/MobileMenu.jsx";
import styles from "./UserMenu.module.css";
import { selectUserInfo } from "../../redux/auth/selectors.js";

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!user) dispatch(apiGetCurrentUserInfo());
  }, [dispatch, user]);

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
      <div className={styles.user_menu_div}>
        <div className={styles.user_icon_div}>
          <Icon
            id="icon-Ellipse-1"
            width="40"
            height="40"
            className={styles.user_icon}
          />
          <span className={styles.user_span_icon}>
            {user?.userName?.charAt(0).toUpperCase() || "G"}
          </span>
        </div>
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
      </div>

      <MobileMenu modalIsOpen={modalIsOpen} closeModal={closeModal} />
    </div>
  );
};

export default UserMenu;
