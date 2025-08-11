import ReactModal from "react-modal";
import BookingForm from "../BookingForm/BookingForm";
import styles from "./UpdateMenu.module.css";

const UpdateMenu = ({ modalIsOpen, closeModal, customStyles, id }) => {
  return (
    <div>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <BookingForm />
      </ReactModal>
    </div>
  );
};

export default UpdateMenu;
