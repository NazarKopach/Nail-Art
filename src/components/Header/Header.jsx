import Navigation from "../Navigation/Navigation";
import UserMenu from "../UserMenu/UserMenu";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.header_div}>
      <img
        className={styles.header_img}
        src="/original.jpg"
        width="60"
        height="100"
      />
      <Navigation />
      <UserMenu />
    </div>
  );
};
export default Header;
