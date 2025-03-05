import { Outlet } from "react-router-dom";
import UserLayout from "../pages/User/Layout/UserLayout";
import UserHomePage from "../pages/User/Homepage/UserHomePage";
import ProtectedRoute from "./ProtectedRoute";
import MovieDetails from "../pages/User/MovieDetails/MovieDetails";
import TheatresAndShowDetails from "../pages/User/TheatresAndShowDetails/TheatresAndShowDetails";
import ShowSeatLayout from "../pages/User/TheatresAndShowDetails/ShowSeatLayout";
import NotFound from "./NotFound";
import BookingList from "../pages/User/TheatresAndShowDetails/BookingHistory";
import UserProfile from "../pages/User/Layout/UserProfile";
import BookingConfirmation from "../pages/User/TheatresAndShowDetails/BookingCOnfirmation";

const UserRoutes = () => {
  return (
    <ProtectedRoute allowedUserType={"user"}>
      <UserLayout>
        <Outlet />
      </UserLayout>
    </ProtectedRoute>
  );
};

const userRoutes = [
  {
    path: "home",
    element: <UserHomePage />,
  },
  {
    path: ":cityName/movies/:movieName/:movieId",
    element: <MovieDetails />,
  },
  {
    path: ":cityName/movies/:movieName/:movieId/buyTickets",
    element: <TheatresAndShowDetails />,
  },
  {
    path: ":cityName/movies/:movieName/:movieId/buyTickets/shows/:showId/seatLayout",
    element: <ShowSeatLayout />,
  },
  // {
  //   path: "paymentScreen",
  //   element: <PaymentScreen />,
  // },
  { path: "booking-history", element: <BookingList /> },
  {
    path: "profile",
    element: <UserProfile />,
  },
  {
    path: "booking-confirmation",
    element: <BookingConfirmation />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export { userRoutes, UserRoutes };
