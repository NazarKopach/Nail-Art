import { useDispatch, useSelector } from "react-redux";
import { userBookings } from "../../redux/booking/selectors";
import { useEffect } from "react";
import {
  deleteContact,
  fetchUserBookings,
} from "../../redux/booking/operations";
import styles from "./CatalogItem.module.css";
import { selectUser } from "../../redux/auth/selectors";

const CatalogItem = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  console.log(user);
  const bookings = useSelector(userBookings);

  useEffect(() => {
    dispatch(fetchUserBookings());
  }, [dispatch]);

  const handleDelet = async (id) => {
    await dispatch(deleteContact(id)).unwrap();
    dispatch(fetchUserBookings());
  };

  return (
    <div className={styles.catalog_item_div}>
      <ul className={styles.catalog_item_list}>
        {Array.isArray(bookings) && bookings.length > 0 ? (
          bookings.map((booking) => (
            <li key={booking._id} className={styles.catalog_item}>
              <div>
                {" "}
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
              </div>

              <div className={styles.catalog_item_btn_div}>
                <button
                  className={styles.catalog_item_btn}
                  type="button"
                  onClick={() => handleDelet(booking._id)}
                >
                  Delete
                </button>
                <button
                  className={styles.catalog_item_btn}
                  type="button"
                  onClick={() => handleDelet(booking._id)}
                >
                  Update
                </button>
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
