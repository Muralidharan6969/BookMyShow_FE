import { Box, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  ArrowBackIos,
  ArrowForwardIos,
  Edit,
  Close,
} from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import { get } from "../../../app/api/apiConfig";

const SeatLayoutHeader = ({
  selectedSeatCount,
  setOpen,
  handleBackClick,
  showId,
  isBlockSuccessful,
}) => {
  const theme = useTheme();
  const [showDetails, setShowDetails] = useState();

  const fetchShowDetails = async () => {
    const response = await get({
      url: `/shows/${showId}/details`,
    });
    console.log("response.data", response.data);
    setShowDetails(response.data);
  };

  useEffect(() => {
    fetchShowDetails();
  }, []);

  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      height={"50px"}
      padding={"10px"}
      borderBottom={"1px solid #999"}
      borderTop={"1px solid #999"}
    >
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"flex-start"}
        gap={"1rem"}
      >
        <IconButton
          onClick={handleBackClick}
          sx={{
            color: "black",
            "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
          }}
        >
          <ArrowBackIos />
        </IconButton>
        <Box display={"flex"} flexDirection={"column"}>
          <Typography
            fontSize={theme.typography.body1.fontSize}
            fontWeight={theme.typography.body1.fontWeight}
          >
            {showDetails?.movieName}
          </Typography>
          <Typography
            fontSize={theme.typography.body2.fontSize}
            fontWeight={theme.typography.body2.fontWeight}
          >{`${showDetails?.theatreDetail} | ${showDetails?.showDetail}`}</Typography>
        </Box>
      </Box>
      {!isBlockSuccessful && (
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-end"}
          gap={"2em"}
        >
          <Box
            display={"flex"}
            borderRadius={"4px"}
            alignItems={"center"}
            justifyContent={"space-around"}
            gap={"1rem"}
            border={"1px solid #999"}
            p={0.5}
            onClick={() => setOpen(true)}
            sx={{
              ":hover": {
                cursor: "pointer",
              },
            }}
          >
            <Typography
              fontSize={theme.typography.body2.fontSize}
              fontWeight={theme.typography.body2.fontWeight}
            >
              {`${selectedSeatCount} Tickets`}
            </Typography>
            <Edit fontSize="small" />
          </Box>
          <Close onClick={handleBackClick} />
        </Box>
      )}
    </Box>
  );
};

export default SeatLayoutHeader;
