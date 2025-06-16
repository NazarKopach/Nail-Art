import { useDispatch } from "react-redux";
import { apiLogoutUser } from "../../redux/auth/operations";
import styles from "./UserMenu.module.css";

const UserMenu = () => {
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(apiLogoutUser());
  };

  return (
    <div>
      <button className={styles.user_menu_btn} onClick={onLogout}>
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
