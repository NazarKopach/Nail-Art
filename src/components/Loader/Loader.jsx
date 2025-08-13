import { RotatingLines } from "react-loader-spinner";

import style from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={style.loader}>
      <RotatingLines
        visible={true}
        height="96"
        width="96"
        strokeColor="#4682B4"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
      />
    </div>
  );
};

export default Loader;
