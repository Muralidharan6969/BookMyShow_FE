import { useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import CustomModal from "../../../components/common/Modal/CustomModal";

const SeatSelectionModal = ({ open, onClose }) => {
  const [seatCount, setSeatCount] = useState(1);

  return (
    <CustomModal
      open={open}
      // onClose={() => onClose(seatCount)}
      title="How Many Seats?"
      maxWidth="md"
      height="400px"
      width="40%"
      seatSelection={true}
    >
      {/* Seat Selection UI */}
      {/* <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
        <img src="/car-icon.png" alt="Car" style={{ height: "50px", width: "50px" }} />
      </Box> */}

      {/* Seat Numbers */}
      <Box display="flex" justifyContent="center" gap={1} mt={2}>
        {[...Array(10)].map((_, index) => (
          <Button
            key={index}
            variant={seatCount === index + 1 ? "contained" : "outlined"}
            color="primary"
            onClick={() => setSeatCount(index + 1)}
            sx={{
              minWidth: "40px",
              minHeight: "40px",
              borderRadius: "50%",
            }}
          >
            {index + 1}
          </Button>
        ))}
      </Box>

      {/* Price Categories */}
      <Box
        display="flex"
        justifyContent="space-around"
        mt={3}
        p={2}
        borderTop="1px solid lightgray"
      >
        <Box textAlign="center">
          <Typography variant="body2" color="textSecondary">
            DIAMOND
          </Typography>
          <Typography variant="body1" color="green">
            Rs. 190 Available
          </Typography>
        </Box>
        <Box textAlign="center">
          <Typography variant="body2" color="textSecondary">
            PEARL
          </Typography>
          <Typography variant="body1" color="red">
            Rs. 60 Sold Out
          </Typography>
        </Box>
      </Box>

      {/* Select Seats Button */}
      <Box display={"flex"} justifyContent={"center"}>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          onClick={() => onClose(seatCount)}
        >
          Select Seats
        </Button>
      </Box>
    </CustomModal>
  );
};

export default SeatSelectionModal;
