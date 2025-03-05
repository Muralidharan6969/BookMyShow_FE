import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const RootLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = sessionStorage.getItem("bms-auth-token");
    const userType = sessionStorage.getItem("userType");
    const currentPath = location.pathname;

    if (!token) {
      if (currentPath.includes("login") || currentPath.includes("register")) {
        return;
      }
      navigate("/user/login");
    } else {
      if (
        currentPath.includes("login") ||
        currentPath.includes("register") ||
        currentPath === "/"
      ) {
        switch (userType) {
          case "user":
            navigate("/user/home");
            break;
          case "outlet":
            navigate("/outlet/home");
            break;
          case "admin":
            navigate("/admin/home");
            break;
          default:
            navigate("/user/login");
        }
      }
    }
  }, [navigate]);

  return <Outlet />;
};

export default RootLayout;
