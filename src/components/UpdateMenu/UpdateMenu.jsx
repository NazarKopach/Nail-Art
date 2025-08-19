import ReactModal from "react-modal";
import BookingForm from "../BookingForm/BookingForm";
import styles from "./UpdateMenu.module.css";
import { Icon } from "../Icon/Icon";

const UpdateMenu = ({
  modalIsOpen,
  closeModal,
  customStyles,
  id,
  type,
  price,
}) => {
  return (
    <div>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <div className={styles.update_menu_div}>
          <div className={styles.mobile_modal_icon_div}>
            <Icon id="icon-x" width="28" height="28" onClick={closeModal} />
          </div>
          <BookingForm
            id={id}
            closeModal={closeModal}
            type={type}
            price={price}
          />
        </div>
      </ReactModal>
    </div>
  );
};

export default UpdateMenu;
