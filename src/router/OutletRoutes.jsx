import { Outlet } from "react-router-dom";
import OutletLayout from "./OutletLayout";
import OutletHomePage from "../pages/Outlet/HomePage/OutletHomePage";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "./NotFound";

const OutletRoutes = () => {
  return (
    <ProtectedRoute allowedUserType={"outlet"}>
      <OutletLayout>
        <Outlet />
      </OutletLayout>
    </ProtectedRoute>
  );
};

const outletRoutes = [
  {
    path: "home",
    element: <OutletHomePage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export { OutletRoutes, outletRoutes };
