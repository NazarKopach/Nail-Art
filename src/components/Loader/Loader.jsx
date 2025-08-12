import { Blocks } from "react-loader-spinner";

import style from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={style.loader}>
      <Blocks
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        visible={true}
      />
    </div>
  );
};

export default Loader;
