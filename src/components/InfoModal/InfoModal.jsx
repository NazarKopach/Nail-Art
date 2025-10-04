import ReactModal from "react-modal";
import { infoText } from "../../utils/const";

const InfoModal = ({ modalIsOpen, closeModal, customStyles }) => {
  return (
    <div>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
      >
        {infoText.map((item) => (
          <p key={item.id}> {item.text1}</p>
        ))}
      </ReactModal>
    </div>
  );
};

export default InfoModal;
