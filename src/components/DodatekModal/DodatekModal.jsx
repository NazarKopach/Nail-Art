import ReactModal from "react-modal";
import styles from "./DodatekModal.module.css";
import { Icon } from "../Icon/Icon";
import { customStylesDodatek } from "../modalStyles/modalStyles";
import { setReservation } from "../../redux/reserv/slice";
import { useDispatch } from "react-redux";

const DodatekModal = ({ modalIsOpen, closeModal }) => {
  const dispatch = useDispatch();

  const dodatekServices = [
    {
      dodatekServices: "Zdobienia",
      dodatekPrice: "10",
      dodatekSrc: "./img/gallery/nail_img1.jpg",
    },
    {
      dodatekServices: "Przedluzenie 1 paznokcia",
      dodatekPrice: "10",
      dodatekSrc: "./img/gallery/nail_img2.jpg",
    },
    {
      dodatekServices: "French",
      dodatekPrice: "30",
      dodatekSrc: "./img/gallery/nail_img4.jpg",
    },
    {
      dodatekServices: "Usuwanie materialu",
      dodatekPrice: "10",
      dodatekSrc: "./img/gallery/nail_img6.jpg",
    },
  ];

  const handleSave = (services, price, src) => {
    dispatch(setReservation({ services, price, src }));
    closeModal();
  };

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

export default DodatekModal;
