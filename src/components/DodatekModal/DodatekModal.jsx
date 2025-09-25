import ReactModal from "react-modal";
import styles from "./DodatekModal.module.css";
import { Icon } from "../Icon/Icon";
import { customStylesDodatek } from "../modalStyles/modalStyles";

const DodatekModal = ({ modalIsOpen, closeModal }) => {
  return (
    <div>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStylesDodatek}
        ariaHideApp={false}
      >
        <div className={styles.dodatek_mobile_icon_div}>
          <Icon id="icon-x" width="28" height="28" onClick={closeModal} />
        </div>
      </ReactModal>
    </div>
  );
};

export default DodatekModal;
