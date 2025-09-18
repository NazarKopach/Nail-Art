import { useState } from "react";
import styles from "./BookingServices.module.css";
import { customStyles } from "../modalStyles/modalStyles";
import UpdateMenu from "../UpdateMenu/UpdateMenu";
import { Link } from "react-router-dom";

const BookingServices = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectType, setSelectType] = useState("");
  const [selectPrice, setSelectPrice] = useState("");

  const services = [
    {
      services: "Manicure hybrydowy",
      price: "150",
      src: "./public/img/gallery/nail_img1.jpg",
    },
    {
      services: "Zel(krotki)",
      price: "170",
      src: "./public/img/gallery/nail_img2.jpg",
    },
    {
      services: "Zel(srednia dlugosc od 1)",
      price: "180",
      src: "./public/img/gallery/nail_img4.jpg",
    },
    {
      services: "Zel(dlugie od 2)",
      price: "190",
      src: "./public/img/gallery/nail_img6.jpg",
    },
    {
      services: "Przedluzanie (do 3)",
      price: "240",
      src: "./public/img/gallery/nail_img7.jpg",
    },
    {
      services: "Przedluzanie (od 3)",
      price: "260",
      src: "./public/img/gallery/nail_img9.jpg",
    },
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
              <div className={styles.booking_services_price_div}>
                <p>{service.services}</p>
                <p>{service.price} zl</p>
              </div>
              <img src={service.src} width="40" />
              <button className={styles.booking_services_btn_info}>...</button>
            </div>
            <div>
              <button className={styles.booking_services_btn}>
                <Link to={"/reservation"}>Reserv</Link>
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
