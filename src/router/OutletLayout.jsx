import React from "react";

const OutletLayout = ({ children }) => {
  return (
    <div>
      <header>Outlet Header</header>
      <main>{children}</main>
      <footer>Outlet Footer</footer>
    </div>
  );
};

export default OutletLayout;
