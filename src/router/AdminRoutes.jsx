import { Outlet } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import AdminHomePage from "../pages/Admin/Homepage/AdminHomePage";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "./NotFound";

const AdminRoutes = () => {
  return (
    <ProtectedRoute allowedUserType={"admin"}>
      <AdminLayout>
        <Outlet />
      </AdminLayout>
    </ProtectedRoute>
  );
};

const adminRoutes = [
  {
    path: "home",
    element: <AdminHomePage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export { AdminRoutes, adminRoutes };
