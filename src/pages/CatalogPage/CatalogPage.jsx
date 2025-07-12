import { useSelector } from "react-redux";
import styles from "./CataloPage.module.css";
import { allBookings } from "../../redux/booking/selectors";

const CatalogPage = () => {
  const bookings = useSelector(allBookings);
  console.log(bookings);

  return (
    <div>
      <h1>Catalog Page</h1>
    </div>
  );
};

export default CatalogPage;
