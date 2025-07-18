import "./App.css";

import { Route, Routes } from "react-router-dom";
import { lazy, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { RestrictedRoute } from "./components/RestrictedRoute/RestrictedRoute";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { apiGetCurrentUser } from "./redux/auth/operations";
import { useDispatch, useSelector } from "react-redux";
import { selectUserIsRefreshing } from "./redux/auth/selectors";
import HomePage from "./pages/HomePage/HomePage";
import SvgSprite from "./components/SvgSprite/SvgSprite";

const MainLayout = lazy(() => import("./MainLayout/MainLayout"));
const BookingPage = lazy(() => import("./pages/BookingPage/BookingPage"));
const CatalogPage = lazy(() => import("./pages/CatalogPage/CatalogPage"));
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage/RegisterPage"));

function App() {
  const isRefreshing = useSelector(selectUserIsRefreshing);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(apiGetCurrentUser());
  }, [dispatch]);

  if (isRefreshing) {
    return (
      <div>
        <p>Loading....</p>
      </div>
    );
  }

  return (
    <div>
      <SvgSprite />
      <Routes>
        <Route
          path="/login"
          element={<RestrictedRoute component={<LoginPage />} />}
        />
        <Route
          path="/register"
          element={<RestrictedRoute component={<RegisterPage />} />}
        />
        <Route path="/" element={<PrivateRoute component={<MainLayout />} />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default App;
