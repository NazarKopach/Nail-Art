import { useSelector } from "react-redux";
import { selectUserIsLoggedIn } from "../../redux/auth/selectors";
import { Navigate } from "react-router-dom";

export const RestrictedRoute = ({ component, redirectTo = "/booking" }) => {
  const isLoggedIn = useSelector(selectUserIsLoggedIn);
  return isLoggedIn ? <Navigate to={redirectTo} replace /> : component;
};
