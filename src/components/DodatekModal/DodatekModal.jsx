import ReactModal from "react-modal";
import styles from "./DodatekModal.module.css";
import { Icon } from "../Icon/Icon";

const DodatekModal = ({ modalIsOpen, closeModal, customStylesDodatek }) => {
  return (
    <div>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStylesDodatek}
        ariaHideApp={false}
      >
        <div className={styles.mobile_modal_icon_div}>
          <Icon id="icon-x" width="28" height="28" onClick={closeModal} />
        </div>
      </ReactModal>
    </div>
  );
};

export default DodatekModal;
