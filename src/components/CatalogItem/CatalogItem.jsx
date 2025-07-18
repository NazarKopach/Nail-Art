import { useDispatch, useSelector } from "react-redux";
import { allBookings } from "../../redux/booking/selectors";
import { useEffect } from "react";
import { deleteContact, fetchBookings } from "../../redux/booking/operations";
import styles from "./CatalogItem.module.css";

const CatalogItem = () => {
  const dispatch = useDispatch();

  const bookings = useSelector(allBookings);
  console.log(bookings);

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  const handleDelet = async (id) => {
    await dispatch(deleteContact(id)).unwrap();
    dispatch(fetchBookings());
  };

  return (
    <div>
      <ul>
        {Array.isArray(bookings) && bookings.length > 0 ? (
          bookings.map((booking) => (
            <li key={booking._id} className={styles.catalog_item}>
              <p>Name: {booking.clientName}</p>
              <p>Phone: {booking.phoneNumber}</p>
              <p>Service: {booking.serviceType}</p>
              <p>Data: {booking.date}</p>
              <p>Time: {booking.time}</p>
              <button type="button" onClick={() => handleDelet(booking._id)}>
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
