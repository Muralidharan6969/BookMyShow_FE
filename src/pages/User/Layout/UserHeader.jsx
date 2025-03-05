import React, { useEffect, useState } from "react";
import Showgo from "../../../assets/Showgo_1.png";
import { Box, IconButton, Typography } from "@mui/material";
import CustomInput from "../../../components/common/Custom Components/CustomInput";
import ProfileMenu from "../../../components/common/Menu/ProfileMenu";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setPreferredCity,
  setUserDetails,
} from "../../../app/reducers/userSlice";
import CityModal from "../Homepage/CityModal";
import { ArrowDropDownIcon } from "@mui/x-date-pickers/icons";
import { useTheme } from "@emotion/react";

const UserHeader = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const [cityModalOpen, setCityModalOpen] = useState(false);
  const cityDetails = useSelector((state) => state.userReducer.city);
  const userDetails = useSelector((state) => state.userReducer.userDetails);
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleLogoClick = () => {
    navigate("/user/home");
  };

  useEffect(() => {
    if (!cityDetails || cityDetails.cityId === null) {
      setCityModalOpen(true);
    }
  }, [cityDetails]);

  const citySelection = (city) => {
    dispatch(setPreferredCity(city));
    setCityModalOpen(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("bms-auth-token");
    dispatch(setPreferredCity(null));
    dispatch(setUserDetails(null));
    navigate("/user/login");
  };

  const handleProfileClick = () => {
    navigate("/user/profile");
  };

  const handleOrderClick = () => {
    navigate("/user/booking-history");
  };

  return (
    <>
      <CityModal open={cityModalOpen} citySelection={citySelection} />
      <Box
        display={"flex"}
        justifyContent={"center"}
        position={"sticky"}
        top={0}
        left={0}
        sx={{
          backgroundColor: theme.palette.background.default,
        }}
        zIndex={100}
        boxShadow={"0px 4px 10px rgba(0,0,0,0.15)"}
      >
        <Box
          display={"flex"}
          //   flexDirection={"column"}
          alignItems={"center"}
          //   justifyContent={"space-between"}
          //   gap={"2rem"}
          //   height={"1rem"}
          padding={"1rem"}
          width={"85%"}
          // marginBottom={"1rem"}
        >
          <Box
            display={"flex"}
            justifyContent={"flex-start"}
            width={"70%"}
            gap={"4rem"}
          >
            <img
              src={Showgo}
              alt="ShowGo"
              width={"200px"}
              height={"50px"}
              style={{ objectFit: "contain", cursor: "pointer" }}
              onClick={handleLogoClick}
            ></img>
            <Box
              display={"flex"}
              justifyContent={"flex-start"}
              gap={"1rem"}
              alignItems={"center"}
            >
              <Box
                sx={{
                  ":hover": {
                    backgroundColor: "#e7f1f8",
                    cursor: "pointer",
                  },
                }}
                borderRadius={"4px"}
                padding={"8px 16px"}
              >
                <Typography
                  fontSize={theme.typography.h7.fontSize}
                  fontWeight={theme.typography.h7.fontWeight}
                >
                  Movies
                </Typography>
              </Box>

              <Box
                sx={{
                  ":hover": {
                    backgroundColor: "#e7f1f8",
                    cursor: "pointer",
                  },
                }}
                borderRadius={"4px"}
                padding={"8px 16px"}
              >
                <Typography
                  fontSize={theme.typography.h7.fontSize}
                  fontWeight={theme.typography.h7.fontWeight}
                >
                  Theatres
                </Typography>
              </Box>
              <Box
                sx={{
                  ":hover": {
                    backgroundColor: "#e7f1f8",
                    cursor: "pointer",
                  },
                }}
                borderRadius={"4px"}
                padding={"8px 16px"}
                onClick={handleOrderClick}
              >
                <Typography
                  fontSize={theme.typography.h7.fontSize}
                  fontWeight={theme.typography.h7.fontWeight}
                >
                  Orders
                </Typography>
              </Box>
            </Box>
          </Box>
          {/* <Box flexGrow={2}>
            <CustomInput
              name="searchField"
              disabled={false}
              placeholder="Search for Movies and Cinemas"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              //   width="100%"
            />
          </Box> */}
          <Box display={"flex"} justifyContent={"flex-end"} width={"30%"}>
            <Box display={"flex"} justifyContent={"space-evenly"}>
              <Box
                onClick={() => setCityModalOpen(true)}
                sx={{
                  ":hover": {
                    cursor: "pointer",
                  },
                }}
              >
                <Typography sx={{ minWidth: 100 }}>
                  {cityDetails?.cityName || "Select City"}
                  <IconButton disableRipple>
                    <ArrowDropDownIcon />
                  </IconButton>
                </Typography>
              </Box>
              <ProfileMenu
                handleLogout={() => handleLogout()}
                handleProfileClick={() => handleProfileClick()}
                handleOrderClick={() => handleOrderClick()}
                userName={userDetails?.name}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UserHeader;
