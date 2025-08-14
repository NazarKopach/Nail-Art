import { useState } from "react";
import styles from "./BookingServices.module.css";
import { customStyles } from "../modalStyles/modalStyles";
import UpdateMenu from "../UpdateMenu/UpdateMenu";

const BookingServices = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const services = [
    { services: "Manicure hybrydowy", price: "150" },
    { services: "Zel(krotki)", price: "170" },
    { services: "Zel(srednia dlugosc od 1)", price: "180" },
    { services: "Zel(dlugie od 2)", price: "190" },
    { services: "Przedluzanie (do 3)", price: "240" },
    { services: "Przedluzanie (od 3)", price: "260" },
    { services: "Zdobienia", price: "10" },
    { services: "Przedluzenie 1 paznokcia", price: "10" },
    { services: "French", price: "30" },
    { services: "Usuwanie materialu", price: "10" },
  ];

  function openModal() {
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
                onClick={openModal}
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
      />
    </div>
  );
};

export default BookingServices;
