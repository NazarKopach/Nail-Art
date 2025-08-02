import CatalogItem from "../../components/CatalogItem/CatalogItem";
import styles from "./CataloPage.module.css";

const CatalogPage = () => {
  return (
    <div className={styles.catalog_page_div}>
      <CatalogItem />
    </div>
  );
};

export default CatalogPage;
