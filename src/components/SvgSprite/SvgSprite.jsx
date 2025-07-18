const SvgSprite = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
      <defs>
        <symbol id="icon-burger" viewBox="0 0 32 32">
          <path
            fill="none"
            stroke="#f9f9f9"
            style={{ stroke: "var(--color1, #f9f9f9)" }}
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeMiterlimit="4"
            strokeWidth="2.2857"
            d="M4 16h24M4 8h24M12 24h16"
          ></path>
        </symbol>
        <symbol id="icon-x" viewBox="0 0 32 32">
          <path
            fill="none"
            stroke="#f9f9f9"
            style={{ stroke: "var(--color1, #f9f9f9)" }}
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeMiterlimit="4"
            strokeWidth="2.2857"
            d="M24 8l-16 16"
          ></path>
          <path
            fill="none"
            stroke="#f9f9f9"
            style={{ stroke: "var(--color1, #f9f9f9)" }}
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeMiterlimit="4"
            strokeWidth="2.2857"
            d="M8 8l16 16"
          ></path>
        </symbol>
      </defs>
    </svg>
  );
};
export default SvgSprite;
