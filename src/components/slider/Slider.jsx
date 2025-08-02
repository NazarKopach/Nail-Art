import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectCube } from "swiper/modules";
import styles from "./Slider.module.css";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-cube";

const Slider = () => {
  return (
    <div>
      <Swiper
        effect={"cube"}
        grabCursor={true}
        cubeEffect={{
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        modules={[EffectCube, Pagination, Autoplay]}
        className={styles.swiper}
      >
        <SwiperSlide className={styles.swiper_slide}>
          <img
            src="../img/gallery/nail_img1.jpg"
            alt="Slide 1"
            className={styles.swiper_img}
          />
        </SwiperSlide>{" "}
        <SwiperSlide>
          <img
            src="../img/gallery/nail_img2.jpg"
            alt="Slide 2"
            className={styles.swiper_img}
          />
        </SwiperSlide>{" "}
        <SwiperSlide>
          <img
            src="../img/gallery/nail_img3.jpg"
            alt="Slide 3"
            className={styles.swiper_img}
          />
        </SwiperSlide>{" "}
        <SwiperSlide>
          <img
            src="../img/gallery/nail_img4.jpg"
            alt="Slide 4"
            className={styles.swiper_img}
          />
        </SwiperSlide>{" "}
        <SwiperSlide>
          <img
            src="../img/gallery/nail_img5.jpg"
            alt="Slide 5"
            className={styles.swiper_img}
          />
        </SwiperSlide>{" "}
        <SwiperSlide>
          <img
            src="../img/gallery/nail_img1.jpg"
            alt="Slide 6"
            className={styles.swiper_img}
          />
        </SwiperSlide>{" "}
        <SwiperSlide>
          <img
            src="../img/gallery/nail_img7.jpg"
            alt="Slide 7"
            className={styles.swiper_img}
          />
        </SwiperSlide>{" "}
        <SwiperSlide>
          <img
            src="../img/gallery/nail_img8.jpg"
            alt="Slide 8"
            className={styles.swiper_img}
          />
        </SwiperSlide>{" "}
        <SwiperSlide>
          <img
            src="../img/gallery/nail_img9.jpg"
            alt="Slide 9"
            className={styles.swiper_img}
          />
        </SwiperSlide>{" "}
        <SwiperSlide>
          <img
            src="../img/gallery/nail_img10.jpg"
            alt="Slide 10"
            className={styles.swiper_img}
          />
        </SwiperSlide>{" "}
        <SwiperSlide>
          <img
            src="../img/gallery/nail_img11.jpg"
            alt="Slide 11"
            className={styles.swiper_img}
          />
        </SwiperSlide>{" "}
        <SwiperSlide>
          <img
            src="../img/gallery/nail_img12.jpg"
            alt="Slide 12"
            className={styles.swiper_img}
          />
        </SwiperSlide>{" "}
        <SwiperSlide>
          <img
            src="../img/gallery/nail_img13.jpg"
            alt="Slide 13"
            className={styles.swiper_img}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
