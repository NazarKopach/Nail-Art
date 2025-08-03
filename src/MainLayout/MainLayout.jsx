import { Outlet } from "react-router-dom";
import styles from "./MainLayout.module.css";
import Header from "../components/Header/Header";

const MainLayout = () => {
  return (
    <div className={styles.main_layor_conteiner}>
      <Header />
      <Outlet />
    </div>
  );
};

export default MainLayout;
