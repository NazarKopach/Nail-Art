import ReactModal from "react-modal";
import styles from "./InfoModal.module.css";

const InfoModal = ({ modalIsOpen, closeModal, id, text }) => {
  return (
    <div>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        closeTimeoutMS={300}
        ariaHideApp={false}
        overlayClassName={{
          base: styles.overlayBase,
          afterOpen: styles.overlayAfterOpen,
          beforeClose: styles.overlayBeforeClose,
        }}
        className={{
          base: styles.contentBase,
          afterOpen: styles.contentAfterOpen,
          beforeClose: styles.contentBeforeClose,
        }}
      >
        <p key={id}> {text}</p>
      </ReactModal>
    </div>
  );
};

export default InfoModal;
