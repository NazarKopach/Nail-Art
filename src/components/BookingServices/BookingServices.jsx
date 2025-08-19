import { useState } from "react";
import styles from "./BookingServices.module.css";
import { customStyles } from "../modalStyles/modalStyles";
import UpdateMenu from "../UpdateMenu/UpdateMenu";

const BookingServices = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectType, setSelectType] = useState("");
  const [selectPrice, setSelectPrice] = useState("");

  const services = [
    { services: "Manicure hybrydowy", price: "150" },
    { services: "Zel(krotki)", price: "170" },
    { services: "Zel(srednia dlugosc od 1)", price: "180" },
    { services: "Zel(dlugie od 2)", price: "190" },
    { services: "Przedluzanie (do 3)", price: "240" },
    { services: "Przedluzanie (od 3)", price: "260" },
  ];

  function openModal(type, price) {
    setSelectType(type);
    setSelectPrice(price);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className={styles.booking_services_div}>
      <ul className={styles.booking_services_list}>
        {services.map((service) => (
          <li className={styles.booking_services_item} key={service.services}>
            <div>
              <p>{service.services}</p>
              <p>{service.price} zl</p>
            </div>
            <div>
              <button
                className={styles.booking_services_btn}
                type="button"
                onClick={() => openModal(service.services, service.price)}
              >
                reserv
              </button>
            </div>
          </li>
        ))}
      </ul>
      <UpdateMenu
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        customStyles={customStyles}
        type={selectType}
        price={selectPrice}
      />
    </div>
  );
};

export default BookingServices;
