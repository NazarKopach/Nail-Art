import { useDispatch, useSelector } from "react-redux";
import { allBookings } from "../../redux/booking/selectors";
import { useEffect } from "react";
import { fetchBookings } from "../../redux/booking/operations";
import styles from "./CatalogItem.module.css";

const CatalogItem = () => {
  const dispatch = useDispatch();

  const bookings = useSelector(allBookings);
  console.log(bookings);

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  return (
    <div>
      <ul>
        {Array.isArray(bookings) &&
          bookings.map((bookings) => (
            <li key={bookings._id} className={styles.catalog_item}>
              <p>Name: {bookings.clientName}</p>
              <p>Data: {bookings.date}</p>
              <p>Time: {bookings.time}</p>
              <button type="button">Delete</button>
            </li>
          ))}
      </ul>
      ;
    </div>
  );
};

export default CatalogItem;
