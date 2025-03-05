import React from "react";
import { useLocation } from "react-router-dom";
import UserHeader from "./UserHeader";
import UserFooter from "./UserFooter";

const UserLayout = ({ children }) => {
  const location = useLocation();

  // Define regex to match the full dynamic seat layout route
  const shouldHideHeaderFooter =
    /^\/user\/[^/]+\/movies\/[^/]+\/\d+\/buyTickets\/shows\/\d+\/seatLayout$/.test(
      location.pathname
    );

  return (
    <div>
      {!shouldHideHeaderFooter && <UserHeader />}
      <main>{children}</main>
      {!shouldHideHeaderFooter && <UserFooter />}
    </div>
  );
};

export default UserLayout;
