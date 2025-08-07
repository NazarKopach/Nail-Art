import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import UserMenu from "../UserMenu/UserMenu";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.header_div}>
      <div className={styles.header_wrapper}>
        <Link className={styles.header_logo} to={"/home"}>
          <img src="/logo_2.png" className={styles.header_logo} />
        </Link>
      </div>
      <Navigation />
      <UserMenu />
    </div>
  );
};
export default Header;
