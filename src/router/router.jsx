import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { userRoutes, UserRoutes } from "./UserRoutes";
import RootLayout from "./RootLayout";
import UserLogin from "../pages/User/Login/UserLogin";
import UserRegister from "../pages/User/Register/UserRegister";
import OutletLogin from "../pages/Outlet/Login/OutletLogin";
import OutletRegister from "../pages/Outlet/Register/OutletRegister";
import AdminLogin from "../pages/Admin/Login/AdminLogin";
import AdminRegister from "../pages/Admin/Register/AdminRegister";
import { outletRoutes, OutletRoutes } from "./OutletRoutes";
import { adminRoutes, AdminRoutes } from "./AdminRoutes";
import Unauthorized from "./Unauthorized";
import NotFound from "./NotFound";
import AppErrorBoundary from "../components/common/AppErrorBoundary";
import ErrorTestComponent from "../pages/ErrorTestComponent";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AppErrorBoundary>
        <RootLayout />
      </AppErrorBoundary>
    ),
    children: [
      {
        path: "user",
        children: [
          { path: "login", element: <UserLogin /> },
          { path: "register", element: <UserRegister /> },
          {
            path: "*",
            element: <UserRoutes />,
            children: userRoutes,
          },
        ],
      },
      {
        path: "outlet",
        children: [
          { path: "login", element: <OutletLogin /> },
          { path: "register", element: <OutletRegister /> },
          { path: "*", element: <OutletRoutes />, children: outletRoutes },
        ],
      },
      {
        path: "admin",
        children: [
          { path: "login", element: <AdminLogin /> },
          { path: "register", element: <AdminRegister /> },
          { path: "*", element: <AdminRoutes />, children: adminRoutes },
        ],
      },
      {
        path: "test-error",
        element: <ErrorTestComponent />,
      },
    ],
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
