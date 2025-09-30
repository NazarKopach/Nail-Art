import ReactModal from "react-modal";
import styles from "./DodatekModal.module.css";
import { Icon } from "../Icon/Icon";
import { customStylesDodatek } from "../modalStyles/modalStyles";
import { useDispatch } from "react-redux";
import { setReservationDodatek } from "../../redux/reservDodatek/slice";

const DodatekModal = ({ modalIsOpen, closeModal }) => {
  const dispatch = useDispatch();

  const dodatekServices = [
    {
      idDodatek: 1,
      dodatekServices: "Zdobienia",
      dodatekPrice: "10",
      dodatekSrc: "./img/gallery/nail_img1.jpg",
    },
    {
      idDodatek: 2,
      dodatekServices: "Przedluzenie 1 paznokcia",
      dodatekPrice: "10",
      dodatekSrc: "./img/gallery/nail_img2.jpg",
    },
    {
      idDodatek: 3,
      dodatekServices: "French",
      dodatekPrice: "30",
      dodatekSrc: "./img/gallery/nail_img4.jpg",
    },
    {
      idDodatek: 4,
      dodatekServices: "Usuwanie materialu",
      dodatekPrice: "10",
      dodatekSrc: "./img/gallery/nail_img6.jpg",
    },
  ];

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
