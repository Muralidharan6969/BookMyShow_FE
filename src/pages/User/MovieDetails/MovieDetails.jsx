import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { moviesArray } from "../Homepage/UserHomePage.helper";
import Button from "../../../components/common/buttons/Button";

const getContrastColor = (imageURL, callback) => {
  const img = new Image();
  img.crossOrigin = "Anonymous";
  img.src = imageURL;

  img.onload = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let r = 0,
      g = 0,
      b = 0,
      count = 0;

    for (let i = 0; i < imageData.length; i += 4) {
      r += imageData[i];
      g += imageData[i + 1];
      b += imageData[i + 2];
      count++;
    }

    r = r / count;
    g = g / count;
    b = b / count;

    // Brightness formula
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    callback(brightness > 128 ? "black" : "white");
  };
};

const MovieDetails = () => {
  const [movieObj, setMovieObj] = useState(null);
  const [loader, setLoader] = useState(true);
  const [textColor, setTextColor] = useState("white");
  const { movieId, cityName } = useParams();

  useEffect(() => {
    const mvObj = moviesArray.find(
      (movie) => movie.movieId === Number(movieId)
    );
    setMovieObj(mvObj);
    setLoader(false);

    if (mvObj?.backgroundImageURL) {
      getContrastColor(mvObj.backgroundImageURL, setTextColor);
    }
  }, [movieId]);

  return (
    <>
      {loader ? (
        <Box>Shimmer UI to be implemented</Box>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          height="30rem"
          paddingLeft="2rem"
          sx={{
            backgroundImage: `url(${movieObj?.backgroundImageURL})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
          }}
        >
          {/* Overlay to improve text visibility */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          />

          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"flex-start"}
            gap={"2rem"}
          >
            {/* Movie Poster */}
            <Box
              width="12rem"
              height="20rem"
              borderRadius="4px"
              sx={{
                backgroundImage: `url(${movieObj?.movieImageURL})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                objectFit: "contain",
                position: "relative",
                zIndex: 1,
              }}
            />

            {/* Movie Details */}
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              width="12rem"
              height="20rem"
              gap="1.5rem"
              sx={{ position: "relative", zIndex: 1 }}
            >
              <Typography color={textColor} fontWeight="bold" fontSize="1.5rem">
                {movieObj?.movieName}
              </Typography>
              <Typography color={textColor} fontSize="1.2rem">
                {movieObj?.language}
              </Typography>
              <Button label="Book Tickets" variant="primary" />
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default MovieDetails;
