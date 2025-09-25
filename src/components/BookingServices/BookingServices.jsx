import { useLayoutEffect, useState } from "react";
import styles from "./BookingServices.module.css";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useDispatch } from "react-redux";
import { setReservation } from "../../redux/reserv/slice";

const BookingServices = () => {
  const [selectType, setSelectType] = useState("");
  const [selectPrice, setSelectPrice] = useState("");

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(`.${styles.booking_services_item}`, {
        opacity: 0,
        y: -50,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    });

    return () => ctx.revert();
  }, []);

  const services = [
    {
      services: "Manicure hybrydowy",
      price: "150",
      src: "./img/gallery/nail_img1.jpg",
    },
    {
      services: "Zel(krotki)",
      price: "170",
      src: "./img/gallery/nail_img2.jpg",
    },
    {
      services: "Zel(srednia dlugosc od 1)",
      price: "180",
      src: "./img/gallery/nail_img4.jpg",
    },
    {
      services: "Zel(dlugie od 2)",
      price: "190",
      src: "./img/gallery/nail_img6.jpg",
    },
    {
      services: "Przedluzanie (do 3)",
      price: "240",
      src: "./img/gallery/nail_img7.jpg",
    },
    {
      services: "Przedluzanie (od 3)",
      price: "260",
      src: "./img/gallery/nail_img9.jpg",
    },
  ];

  const handleSave = () => {
    dispatch(setReservation({ service: "manicure", price: 150 }));
  };

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
                <Link onClick={() => handleSave()} to={"/reservation"}>
                  Reserv
                </Link>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingServices;
