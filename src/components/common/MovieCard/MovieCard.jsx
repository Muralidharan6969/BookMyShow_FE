import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movieObj, selectedCategory }) => {
  const navigate = useNavigate(); // From React Router
  const cityDetails = useSelector((state) => state.userReducer.city);
  const theme = useTheme();

  const isNowShowing = selectedCategory === "nowShowing";

  const handleClick = () => {
    if (!isNowShowing) return;
    const url = `/user/${cityDetails.cityName}/movies/${movieObj.movieName}/${movieObj.movieId}/buyTickets`;
    navigate(url);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        cursor: "pointer",
        "&:hover": {
          transform: "scale(1.02)",
          transition: "transform 0.3s ease-in-out",
        },
      }}
      // gap={"1rem"}
      marginTop={"2rem"}
      onClick={handleClick}
      border={"1px solid hsla(0,0%,6%,.13)"}
      width={"290px"}
      minHeight={"379px"}
      borderRadius="4px"
    >
      <Box
        width={"100%"}
        height={"379px"}
        borderRadius="4px"
        sx={{
          backgroundImage: `url(${movieObj.movieImageURL})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          objectFit: "contain",
        }}
      ></Box>
      <Box
        borderBottom={"1px solid hsla(0,0%,6%,.13)"}
        width={"100%"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-around"}
        textAlign={"left"}
        height={"3rem"}
        bgcolor={"#f6f6f6"}
        sx={{
          background: "#f6f6f6",
        }}
      >
        <Typography>{movieObj.movieName}</Typography>
      </Box>
      {isNowShowing && (
        <Box
          width={"100%"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          height={"3rem"}
          bgcolor={"#f6f6f6"}
          sx={{
            background: "#f6f6f6",
          }}
        >
          <Typography color={theme.palette.primary.main}>
            Book Ticket
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default MovieCard;
