import { useState } from "react";
import { customStylesGallery } from "../modalStyles/modalStyles";
import styles from "./Gallery.module.css";
import GalleryModal from "../GalleryModal/GalleryModal";

const Gallery = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [src, setSrc] = useState("");

  function openModal(src) {
    setSrc(src);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className={styles.gallery_wrapper}>
      <img
        src="/public/img/gallery/nail_img1.jpg"
        className={styles.galler_img}
        onClick={() => openModal("/public/img/gallery/nail_img1.jpg")}
      />
      <img
        src="/public/img/gallery/nail_img2.jpg"
        className={styles.galler_img}
        onClick={() => openModal("/public/img/gallery/nail_img2.jpg")}
      />
      <img
        src="/public/img/gallery/nail_img4.jpg"
        className={styles.galler_img}
        onClick={() => openModal("/public/img/gallery/nail_img4.jpg")}
      />

      <img
        src="/public/img/gallery/nail_img6.jpg"
        className={styles.galler_img}
        onClick={() => openModal("/public/img/gallery/nail_img6.jpg")}
      />
      <img
        src="/public/img/gallery/nail_img7.jpg"
        className={styles.galler_img}
        onClick={() => openModal("/public/img/gallery/nail_img7.jpg")}
      />
      <img
        src="/public/img/gallery/nail_img9.jpg"
        className={styles.galler_img}
        onClick={() => openModal("/public/img/gallery/nail_img9.jpg")}
      />
      <img
        src="/public/img/gallery/nail_img10.jpg"
        className={styles.galler_img}
        onClick={() => openModal("/public/img/gallery/nail_img10.jpg")}
      />
      <img
        src="/public/img/gallery/nail_img11.jpg"
        className={styles.galler_img}
        onClick={() => openModal("/public/img/gallery/nail_img11.jpg")}
      />
      <img
        src="/public/img/gallery/nail_img12.jpg"
        className={styles.galler_img}
        onClick={() => openModal("/public/img/gallery/nail_img12.jpg")}
      />
      <img
        src="/public/img/gallery/nail_img13.jpg"
        className={styles.galler_img}
        onClick={() => openModal("/public/img/gallery/nail_img13.jpg")}
      />
      <GalleryModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        customStyles={customStylesGallery}
        src={src}
      />
    </div>
  );
};

export default Gallery;
