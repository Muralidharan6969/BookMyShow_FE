import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import { theatresAndShowsArrays } from "./TheatresAndShowDetails.helper";
import ShowCard from "./ShowCard";
import { useTheme } from "@emotion/react";
import { Fastfood, PhoneIphone } from "@mui/icons-material";

const TheatresAndShowCard = ({ theatreObj, index, movieName, movieId }) => {
  const theme = useTheme();

  const featureColors = [
    { color: "#49ba8e", element: <PhoneIphone /> },
    { color: "#ffa426", element: <Fastfood /> },
  ];

  return (
    <Box
      borderTop={"1px solid #f2f2f2"}
      display={"flex"}
      key={index}
      justifyContent={"flex-start"}
      width={"100%"}
    >
      <Box
        padding={"10px"}
        marginTop={"8px"}
        width={"28%"}
        minWidth={"250px"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"flex-start"}
        gap={"0.5rem"}
      >
        <Box paddingLeft={"1rem"}>
          <Typography
            fontSize={theme.typography.body1.fontSize}
            fontWeight={theme.typography.body1.fontWeight}
          >
            {theatreObj.theatreName}
          </Typography>
        </Box>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-start"}
          gap={"2rem"}
        >
          {theatreObj.features.map((feature, index) => (
            <Box
              color={featureColors[index].color}
              display={"flex"}
              gap={"0.5rem"}
              alignItems={"center"}
            >
              <IconButton
                color={featureColors[index].color}
                disableRipple
                disabled
              >
                {featureColors[index].element}
              </IconButton>
              <Typography
                fontSize={theme.typography.body2.fontSize}
                fontWeight={theme.typography.body2.fontWeight}
              >
                {feature}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
      <Box
        padding={"10px"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"flex-start"}
        flexWrap={"wrap"}
        width={"72%"}
      >
        {theatreObj?.shows?.map((showObj, index) => (
          <ShowCard
            showObj={showObj}
            index={index}
            movieName={movieName}
            movieId={movieId}
          />
        ))}
      </Box>
    </Box>
  );
};

export default TheatresAndShowCard;
