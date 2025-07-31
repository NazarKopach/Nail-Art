import ReactModal from "react-modal";
import styles from "./Mobile.Menu.module.css";
import { useEffect } from "react";
import { apiLogoutUser } from "../../redux/auth/operations";
import { useDispatch } from "react-redux";
import { Icon } from "../Icon/Icon";
import Navigation from "../Navigation/Navigation";

const MobileMenu = ({ modalIsOpen, closeModal, customStyles }) => {
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(apiLogoutUser());
    closeModal();
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && modalIsOpen) {
        closeModal();
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [modalIsOpen, closeModal]);

  return (
    <ReactModal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      ariaHideApp={false}
    >
      <div className={styles.mobile_modal_icon_div}>
        <Icon id="icon-x" width="28" height="28" onClick={closeModal} />
      </div>
      <div className={styles.mobile_modal_nav_div}>
        <Navigation
          closeModal={closeModal}
          wrapperClass={styles.wrapper_nav}
          linkClass={styles.link_naw}
        />
      </div>
      <button
        className={styles.button_user_mobile}
        type="button"
        onClick={onLogout}
      >
        Logout
      </button>
    </ReactModal>
  );
};

export default MobileMenu;
