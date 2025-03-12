import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import TicketLoaderGif from "../../assets/Ticket Loader 2.gif";

const TicketLoader = ({ open, errorMessage, handleRefresh }) => {
  return (
    <Modal open={open} aria-labelledby="ticket-loader">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "white",
          boxShadow: 24,
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 2,
          width: 300,
        }}
      >
        {!errorMessage ? (
          <>
            <img
              src={TicketLoaderGif}
              alt="Loading..."
              style={{ width: "200px", height: "150px" }}
            />
            <Typography variant="body1" sx={{ mt: 2, color: "gray" }}>
              Processing your booking...
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="h6" color="error">
              Oops! 😢
            </Typography>
            <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
              {errorMessage}
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              sx={{ mt: 3 }}
              onClick={handleRefresh}
            >
              Try Again
            </Button>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default TicketLoader;
