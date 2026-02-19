import { useDispatch, useSelector } from "react-redux";
import { userBookings } from "../../redux/booking/selectors";
import { useEffect, useLayoutEffect } from "react";
import {
  deleteBooking,
  fetchUserBookings,
} from "../../redux/booking/operations";
import styles from "./CatalogItem.module.css";
import gsap from "gsap";
import { Link } from "react-router-dom";
import { setReservation } from "../../redux/reserv/slice";
import { setReservationDodatek } from "../../redux/reservDodatek/slice";

const CatalogItem = () => {
  const dispatch = useDispatch();
  const bookings = useSelector(userBookings);
  console.log(bookings);
  useEffect(() => {
    dispatch(fetchUserBookings());
  }, [dispatch]);

  const handleDelet = async (id) => {
    await dispatch(deleteBooking(id)).unwrap();
    dispatch(fetchUserBookings());
  };

  const handleSave = (
    services,
    price,
    src,
    idDodatek,
    servicesDodatek,
    priceDodatek,
    srcDodatek = [],
  ) => {
    dispatch(
      setReservation({
        services,
        price,
        src,
      }),
    );

    dispatch(
      setReservationDodatek({
        idDodatek,
        servicesDodatek,
        priceDodatek,
        srcDodatek,
      }),
    );
  };

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(`.${styles.catalog_item}`, {
        opacity: 0,
        y: -50,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.catalog_item_div}>
      <ul className={styles.catalog_item_list}>
        {Array.isArray(bookings) && bookings.length > 0 ? (
          bookings.map((booking) => (
            <li key={booking._id} className={styles.catalog_item}>
              <div>
                <p className={styles.catalog_item_title}>
                  <span className={styles.catalog_item_title_span}>
                    {booking.serviceType} {booking.price} zl
                  </span>
                </p>
                {booking.dodatek.map((item) => (
                  <p className={styles.catalog_item_title}>
                    <span className={styles.catalog_item_title_span}>
                      {item.servicesDodatek} {item.priceDodatek} zl
                    </span>
                  </p>
                ))}
                <p className={styles.catalog_item_title}>
                  Data:{" "}
                  <span className={styles.catalog_item_title_span}>
                    {booking.date};
                  </span>
                </p>
                <p className={styles.catalog_item_title}>
                  Time:{" "}
                  <span className={styles.catalog_item_title_span}>
                    {booking.time}
                  </span>
                </p>
              </div>
              <div className={styles.catalog_item_btn_div}>
                <button
                  className={styles.catalog_item_btn}
                  type="button"
                  onClick={() => handleDelet(booking._id)}
                  id={booking._id}
                >
                  Delete
                </button>

                <Link
                  className={styles.catalog_item_btn}
                  type="button"
                  onClick={() => {
                    handleSave(
                      booking.serviceType,
                      booking.price,
                      booking.src,
                      booking.idDodatek,
                      booking.servicesDodatek,
                      booking.priceDodatek,
                      booking.srcDodatek,
                    );
                  }}
                  to="/reservation"
                  state={{ id: booking }}
                >
                  Update
                </Link>
              </div>
            </li>
          ))
        ) : (
          <p>Loading or no bookings found.</p>
        )}
      </ul>
    </div>
  );
};

export default CatalogItem;
