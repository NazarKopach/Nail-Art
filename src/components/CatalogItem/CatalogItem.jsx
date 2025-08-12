import { useDispatch, useSelector } from "react-redux";
import { userBookings } from "../../redux/booking/selectors";
import { useEffect, useState } from "react";
// import { apiGetCurrentUserInfo } from "../../redux/auth/operations";
// import { selectUserInfo } from "../../redux/auth/selectors";
import {
  deleteBooking,
  fetchUserBookings,
  patchBooking,
} from "../../redux/booking/operations";
import styles from "./CatalogItem.module.css";
import UpdateMenu from "../UpdateMenu/UpdateMenu";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(20, 20, 20, 0.6)",
    overflowX: "hidden",
    zIndex: 1000,
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%,-50%)",
    width: "100%",
    maxWidth: "500px",
    height: "400px",
    border: "none",
    borderRadius: "0",
    backgroundColor: "#808080",
  },
};

const CatalogItem = () => {
  const dispatch = useDispatch();
  const bookings = useSelector(userBookings);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  useEffect(() => {
    dispatch(fetchUserBookings());
  }, [dispatch]);

  useEffect(() => {
    dispatch(patchBooking());
  }, [dispatch]);

  const handleDelet = async (id) => {
    await dispatch(deleteBooking(id)).unwrap();
    dispatch(fetchUserBookings());
  };

  function openModal(id) {
    setSelectedBookingId(id);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setSelectedBookingId(null);
  }

  return (
    <div className={styles.catalog_item_div}>
      <ul className={styles.catalog_item_list}>
        {Array.isArray(bookings) && bookings.length > 0 ? (
          bookings.map((booking) => (
            <li key={booking._id} className={styles.catalog_item}>
              <div>
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
                  onClick={() => openModal(booking._id)}
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
      <UpdateMenu
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        customStyles={customStyles}
        id={selectedBookingId}
      />
    </div>
  );
};

export default CatalogItem;
