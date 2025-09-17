import "./App.css";

import { Route, Routes } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { RestrictedRoute } from "./components/RestrictedRoute/RestrictedRoute";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { apiGetCurrentUser } from "./redux/auth/operations";
import { useDispatch, useSelector } from "react-redux";
import { selectUserIsRefreshing } from "./redux/auth/selectors";
import SvgSprite from "./components/SvgSprite/SvgSprite";
import Loader from "./components/Loader/Loader";

const MainLayout = lazy(() => import("./MainLayout/MainLayout"));
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const BookingPage = lazy(() => import("./pages/BookingPage/BookingPage"));
const Gallery = lazy(() => import("./components/Gallery/Gallery"));
const CatalogPage = lazy(() => import("./pages/CatalogPage/CatalogPage"));
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage/RegisterPage"));
const CalendarPage = lazy(() => import("./pages/CalendarPage/CalendarPage"));
const ReservationPage = lazy(() =>
  import("./pages/ReservationPage/ReservationPage")
);

function App() {
  const isRefreshing = useSelector(selectUserIsRefreshing);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(apiGetCurrentUser());
  }, [dispatch]);

  if (isRefreshing) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <SvgSprite />
      <Suspense fallback={<Loader />}>
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
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/reservation" element={<ReservationPage />} />
            <Route path="/admin-calendar" element={<CalendarPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default App;
