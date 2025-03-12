import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import CircularLoader from "./components/common/loader/CircularLoader";
import Button from "./components/common/buttons/Button";
import ProfileMenu from "./components/common/Menu/ProfileMenu";
import CustomDatePicker from "./components/common/Custom Components/CustomDatePicker";
import moment from "moment";
import { Box } from "@mui/material";
import CustomInput from "./components/common/Custom Components/CustomInput";
import CustomSelect from "./components/common/Custom Components/CustomSelect";
import CustomModal from "./components/common/Modal/CustomModal";
import UserRegister from "./pages/User/Register/UserRegister";
import UserLogin from "./pages/User/Login/UserLogin";
import OutletRegister from "./pages/Outlet/Register/OutletRegister";
import OutletLogin from "./pages/Outlet/Login/OutletLogin";
import AdminRegister from "./pages/Admin/Register/AdminRegister";
import AdminLogin from "./pages/Admin/Login/AdminLogin";
import Router from "./router/router";

function App() {
  return <Router />;
}

export default App;
