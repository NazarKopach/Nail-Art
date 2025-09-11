import ReactModal from "react-modal";
import styles from "./GalleryModal.module.css";

const GalleryModal = ({ modalIsOpen, closeModal, customStyles, src }) => {
  return (
    <div>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <img src={src} className={styles.gallery_modal_img} />
      </ReactModal>
    </div>
  );
};

export default GalleryModal;
