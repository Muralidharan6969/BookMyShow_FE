import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedUserType }) => {
  const [isAuthorized, setIsAuthorized] = useState(null); // null indicates "not checked yet"

  useEffect(() => {
    const token = sessionStorage.getItem("bms-auth-token");
    const userType = sessionStorage.getItem("userType");
    setIsAuthorized(token && userType === allowedUserType);
  }, []);

  if (isAuthorized === null) {
    // You could show a loader or simply return null while the check is in progress
    return null;
  }

  if (!isAuthorized) {
    return <Navigate to={`/${allowedUserType}/login`} />;
  }

  return children;
};

export default ProtectedRoute;
