import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Divider,
  Stack,
  styled,
} from "@mui/material";
import {
  AccessTime as AccessTimeIcon,
  LocationOn as LocationOnIcon,
  ConfirmationNumber as TicketIcon,
  CheckCircle as CheckCircleIcon,
  ContentCopy as ContentCopyIcon,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";

// Styled Components
const ConfirmationIcon = styled(CheckCircleIcon)(({ theme }) => ({
  fontSize: 64,
  color: theme.palette.success.main,
  marginBottom: theme.spacing(2),
}));

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [timeLeft, setTimeLeft] = useState(10);
  const [copied, setCopied] = useState(false);

  const bookingDetails = location.state;

  useEffect(() => {
    if (!bookingDetails) {
      navigate("/user/home");
    }
  }, [bookingDetails, navigate]);

  // const bookingDetails = {
  //   bookingId: "BOOK123456789",
  //   movieName: "Vidaamuyarchi",
  //   theatre: "Arsand Theatre",
  //   location: "Madhuranthagam",
  //   date: "Fri, 7 Feb, 2025",
  //   time: "09:30 PM",
  //   seats: "G14, G15",
  //   totalAmount: "₹335.40",
  //   paymentId: "PAY987654321",
  // };

  useEffect(() => {
    // Timer to redirect
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      navigate("/user/booking-history");
    }
  }, [timeLeft, navigate]);

  const copyBookingId = async () => {
    try {
      await navigator.clipboard.writeText(bookingDetails?.bookingId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      sx={{
        background: "#f6f6f6",
      }}
      height={"820px"}
    >
      <Box
        sx={{
          maxWidth: 600,
          mx: "auto",
          p: 3,
          textAlign: "center",
        }}
      >
        {/* Success Message */}
        <Box mb={4}>
          <ConfirmationIcon />
          <Typography
            variant="h4"
            gutterBottom
            fontWeight="bold"
            color="success.main"
          >
            Booking Confirmed!
          </Typography>
          <Typography color="text.secondary">
            Redirecting in {timeLeft} seconds...
          </Typography>
        </Box>

        {/* Booking Details Card */}
        <Card elevation={3}>
          <CardContent>
            {/* Booking ID Section */}
            <Box mb={3}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                Booking ID
              </Typography>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap={1}
              >
                <Typography variant="h6" fontWeight="bold">
                  {bookingDetails?.bookingId}
                </Typography>
                <Button
                  startIcon={<ContentCopyIcon />}
                  size="small"
                  onClick={copyBookingId}
                >
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Movie Details */}
            <Stack spacing={2}>
              <Typography variant="h5" fontWeight="bold">
                {bookingDetails?.movieName}
              </Typography>

              <Box
                display="flex"
                alignItems="center"
                gap={1}
                justifyContent="center"
              >
                <LocationOnIcon color="action" />
                <Typography>
                  {bookingDetails?.theatre}, {bookingDetails?.location}
                </Typography>
              </Box>

              <Box
                display="flex"
                alignItems="center"
                gap={1}
                justifyContent="center"
              >
                <AccessTimeIcon color="action" />
                <Typography>
                  {bookingDetails?.date} | {bookingDetails?.time}
                </Typography>
              </Box>

              <Box
                display="flex"
                alignItems="center"
                gap={1}
                justifyContent="center"
              >
                <TicketIcon color="action" />
                <Typography>Seats: {bookingDetails?.seats}</Typography>
              </Box>
            </Stack>

            <Divider sx={{ my: 2 }} />

            {/* Payment Details */}
            <Box>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                Payment Details
              </Typography>
              <Typography variant="body1" gutterBottom>
                Amount Paid: <strong>{bookingDetails?.totalAmount}</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Payment ID: {bookingDetails?.paymentId}
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Box sx={{ mt: 3, display: "flex", gap: 2, justifyContent: "center" }}>
          <Button
            variant="contained"
            onClick={() => navigate("/user/booking-history")}
          >
            View Booking History
          </Button>
          <Button variant="outlined" onClick={() => navigate("/user/home")}>
            Back to Home
          </Button>
        </Box>

        {/* Timer Progress
    <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
      <CircularProgress
        variant="determinate"
        value={(timeLeft / 10) * 100}
        size={24}
      />
    </Box> */}
      </Box>
    </Box>
  );
};

export default BookingConfirmation;
