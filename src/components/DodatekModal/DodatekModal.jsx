import ReactModal from "react-modal";
import styles from "./DodatekModal.module.css";
import { Icon } from "../Icon/Icon";
import { customStylesDodatek } from "../modalStyles/modalStyles";
import { useDispatch } from "react-redux";
import { setReservationDodatek } from "../../redux/reservDodatek/slice";
import { dodatekServices } from "../../utils/const";

const DodatekModal = ({ modalIsOpen, closeModal }) => {
  const dispatch = useDispatch();

  const handleSave = (idDodatek, servicesDodatek, priceDodatek, srcDodatek) => {
    dispatch(
      setReservationDodatek({
        idDodatek,
        servicesDodatek,
        priceDodatek,
        srcDodatek,
      })
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
          {dodatekServices.map((service) => (
            <li
              className={styles.dodatek_modal_item}
              key={service.dodatekServices}
            >
              <div className={styles.dodatek_modal_price_div}>
                <img src={service.dodatekSrc} width="40" height="40" />
                <p>{`${service.dodatekServices}
                ${service.dodatekPrice} zl`}</p>
              </div>
              <img src={service.src} width="40" />
              <div>
                <button
                  className={styles.dodatek_modal_btn}
                  onClick={() =>
                    handleSave(
                      service.idDodatek,
                      service.dodatekServices,
                      service.dodatekPrice,
                      service.dodatekSrc
                    )
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

export default DodatekModal;
