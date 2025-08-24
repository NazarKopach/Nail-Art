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
import { customStyles } from "../modalStyles/modalStyles";

const CatalogItem = () => {
  const dispatch = useDispatch();
  const bookings = useSelector(userBookings);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState("");
  const [selectType, setSelectType] = useState("");

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

  function openModal(id, type) {
    setSelectedBookingId(id);
    setSelectType(type);
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
                >
                  Delete
                </button>
                <button
                  className={styles.catalog_item_btn}
                  type="button"
                  onClick={() => openModal(booking._id, booking.serviceType)}
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
        type={selectType}
      />
    </div>
  );
};

export default CatalogItem;
