export const Icon = ({
  id,
  width = 40,
  height = 40,
  className = "",
  ...rest
}) => (
  <svg width={width} height={height} className={className} {...rest}>
    <use xlinkHref={`#${id}`} />
  </svg>
);
