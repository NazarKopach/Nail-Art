import ReactModal from "react-modal";
import { Icon } from "../Icon/Icon";
import styles from "./ServicesModal.module.css";
import { services } from "../../utils/const";
import { useDispatch } from "react-redux";
import { setReservation } from "../../redux/reserv/slice";

const ServiceModal = ({ modalIsOpen, closeModal }) => {
  const dispatch = useDispatch();

  const handleSave = (services, price, src) => {
    dispatch(
      setReservation({
        services,
        price,
        src,
      }),
    );
    closeModal();
  };

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
        <div className={styles.dodatek_mobile_icon_div}>
          <Icon id="icon-x" width="28" height="28" onClick={closeModal} />
        </div>
        <ul className={styles.dodatek_modal_list}>
          {services.map((service) => (
            <li key={service.src} className={styles.dodatek_modal_item}>
              <div className={styles.dodatek_modal_price_div}>
                <img src={service.src} width="40" height="40" />
                <p>{`${service.services} ${service.price} zl`}</p>
              </div>
              <div>
                <button
                  className={styles.dodatek_modal_btn}
                  onClick={() =>
                    handleSave(service.services, service.price, service.src)
                  }
                >
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
      </ReactModal>
    </div>
  );
};

export default ServiceModal;
