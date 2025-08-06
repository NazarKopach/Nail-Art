import { useDispatch, useSelector } from "react-redux";
import { allBookings } from "../../redux/booking/selectors";
import { useEffect } from "react";
import { deleteContact, fetchBookings } from "../../redux/booking/operations";
import styles from "./CatalogItem.module.css";

const CatalogItem = () => {
  const dispatch = useDispatch();
  const bookings = useSelector(allBookings);

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  const handleDelet = async (id) => {
    await dispatch(deleteContact(id)).unwrap();
    dispatch(fetchBookings());
  };

  return (
    <div className={styles.catalog_item_div}>
      <ul>
        {Array.isArray(bookings) && bookings.length > 0 ? (
          bookings.map((booking) => (
            <li key={booking._id} className={styles.catalog_item}>
              <p className={styles.catalog_item_title}>
                Name:{" "}
                <span className={styles.catalog_item_title_span}>
                  {booking.clientName}
                </span>
              </p>
              <p className={styles.catalog_item_title}>
                Phone:{" "}
                <span className={styles.catalog_item_title_span}>
                  {booking.phoneNumber}
                </span>
              </p>
              <p className={styles.catalog_item_title}>
                Service:{" "}
                <span className={styles.catalog_item_title_span}>
                  {booking.serviceType}
                </span>
              </p>
              {booking.dodatek !== "" && (
                <p className={styles.catalog_item_title}>
                  Dodatek:{" "}
                  <span className={styles.catalog_item_title_span}>
                    {booking.dodatek}
                  </span>
                </p>
              )}
              <p className={styles.catalog_item_title}>
                Data:{" "}
                <span className={styles.catalog_item_title_span}>
                  {booking.date
                    ? new Date(booking.date).toLocaleDateString()
                    : "Brak daty"}
                  ;
                </span>
              </p>
              <p className={styles.catalog_item_title}>
                Time:{" "}
                <span className={styles.catalog_item_title_span}>
                  {booking.time}
                </span>
              </p>
              <button
                className={styles.catalog_item_btn}
                type="button"
                onClick={() => handleDelet(booking._id)}
              >
                Delete
              </button>
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
