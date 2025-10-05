import { useLayoutEffect, useState } from "react";
import styles from "./BookingServices.module.css";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useDispatch } from "react-redux";
import { setReservation } from "../../redux/reserv/slice";
import { services } from "../../utils/const";
import InfoModal from "../InfoModal/InfoModal";
import { customStylesDodatek } from "../modalStyles/modalStyles";

const BookingServices = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [servicesText, setServicesText] = useState("");

  const dispatch = useDispatch();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal(id) {
    setServicesText(id);
    setIsOpen(true);
  }

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

  const handleSave = (services, price, src) => {
    dispatch(setReservation({ services, price, src }));
  };

  return (
    <div className={styles.booking_services_div}>
      <ul className={styles.booking_services_list}>
        {services.map((service) => (
          <li className={styles.booking_services_item} key={service.services}>
            <div className={styles.booking_services_item_wrapper}>
              <img src={service.src} width="40" />
              <div className={styles.booking_services_price_div}>
                <p>{service.services}</p>
                <p>{service.price} zl</p>
                <button
                  className={styles.booking_services_btn_info}
                  onClick={() => openModal(service.text)}
                >
                  info
                </button>
              </div>
            </div>
            <div>
              <Link
                className={styles.booking_services_btn}
                onClick={() =>
                  handleSave(service.services, service.price, service.src)
                }
                to={"/reservation"}
              >
                Reserv
              </Link>
            </div>
          </li>
        ))}
      </ul>
      <InfoModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        customStyles={customStylesDodatek}
        text={servicesText}
      />
    </div>
  );
};

export default BookingServices;
