import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ShowCard = ({ showObj, index, movieName, movieId }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const cityDetails = useSelector((state) => state.userReducer.city);

  const getStyles = (status) => {
    switch (status) {
      case "Available":
        return {
          borderColor: "#cfcfcf",
          textColor: "#4abd5d",
          isClickable: true,
        };
      case "Fast Filling":
        return {
          borderColor: "#cfcfcf",
          textColor: "#f60",
          isClickable: true,
        };
      case "Unavailable":
        return {
          borderColor: "#cfcfcf",
          textColor: "#999",
          isClickable: false,
        };
      default:
        return {
          borderColor: "#cfcfcf",
          textColor: "#717171",
          isClickable: true,
        };
    }
  };

  const { borderColor, textColor, isClickable } = getStyles(
    showObj.availabilityStatus
  );

  const handleShowClick = (showObj) => {
    navigate(
      `/user/${cityDetails?.cityId}/movies/${movieName}/${movieId}/buyTickets/shows/${showObj?.showId}/seatLayout`
    );
  };

  return (
    <Box margin={"8px"} width={"calc(100% / 3 - 16px)"} maxWidth={"110px"}>
      <Box
        key={index}
        border={`0.5px solid ${borderColor}`}
        borderRadius={"4px"}
        width={"100px"}
        height={"40px"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        position={"relative"}
        padding={"4px"}
        sx={{
          cursor: isClickable ? "pointer" : "not-allowed",
          opacity: isClickable ? 1 : 0.5,
        }}
        onClick={() => {
          if (isClickable) {
            handleShowClick(showObj);
          }
        }}
      >
        <Typography
          color={textColor}
          textTransform={"uppercase"}
          fontSize={theme.typography.body2.fontSize}
          fontWeight={theme.typography.body2.fontWeight}
        >
          {showObj.showStartTime}
        </Typography>
        <Typography
          color={"#999"}
          textTransform={"uppercase"}
          fontSize={theme.typography.body3.fontSize}
          fontWeight={theme.typography.body3.fontWeight}
        >
          {showObj.screenName}
        </Typography>
      </Box>
    </Box>
  );
};

export default ShowCard;
