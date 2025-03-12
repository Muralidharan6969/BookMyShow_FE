import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  Button,
  Skeleton,
} from "@mui/material";
import { Box } from "@mui/system";
import MovieIcon from "@mui/icons-material/Movie";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import { get } from "../../../app/api/apiConfig";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const BookingCard = ({ booking }) => {
  return (
    <Card
      sx={{
        mb: 2,
        p: 2,
        borderRadius: 2,
        boxShadow: 3,
        width: { xs: "100%", sm: "500px", md: "600px" }, // Responsive width
        height: "315px",
      }}
    >
      <Grid container spacing={2} alignItems="center">
        {/* Movie Poster */}
        <Grid item xs={12} sm={3}>
          <Box
            sx={{
              width: "100%",
              height: { xs: 208, sm: 208 }, // Responsive height
              bgcolor: "grey.300",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 1,
              backgroundImage: `url(${booking.movieImageURL})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              objectFit: "cover",
            }}
          >
            {/* <MovieIcon sx={{ fontSize: 60, color: "grey.600" }} /> */}
          </Box>
        </Grid>

        {/* Booking Details */}
        <Grid item xs={12} sm={9}>
          <Typography
            variant="h6"
            fontWeight="bold"
            textAlign={{ xs: "center", sm: "left" }}
          >
            {booking.movieName}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            textAlign={{ xs: "center", sm: "left" }}
          >
            {booking.date} | {booking.time}
          </Typography>
          <Typography
            variant="body2"
            mt={1}
            textAlign={{ xs: "center", sm: "left" }}
          >
            {booking.theater}
          </Typography>
          <Typography
            variant="body2"
            mt={1}
            textAlign={{ xs: "center", sm: "left" }}
          >
            <EventSeatIcon fontSize="small" sx={{ mr: 1 }} /> {booking.seats}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            mt={1}
            textAlign={{ xs: "center", sm: "left" }}
          >
            Screen: {booking.screen}
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography
              variant="body1"
              fontWeight="bold"
              textAlign={{ xs: "center", sm: "left" }}
            >
              Amount Paid:
            </Typography>
            <Typography
              variant="body1"
              fontWeight="bold"
              textAlign={{ xs: "center", sm: "left" }}
            >
              ₹ {booking.totalAmount.toFixed(2)}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ my: 2 }} />

      {/* Payment and Booking Info */}
      <Grid
        container
        justifyContent="space-between"
        flexDirection={{ xs: "column", sm: "row" }}
        textAlign="center"
      >
        <Typography variant="body2" color="text.secondary">
          <CreditCardIcon fontSize="small" sx={{ mr: 1 }} />{" "}
          {booking.paymentMethod}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Booking ID: {booking.id}
        </Typography>
      </Grid>

      <Grid
        container
        justifyContent="space-between"
        flexDirection={{ xs: "column", sm: "row" }}
        mt={2}
        textAlign="center"
      >
        <Typography variant="body2" color="text.secondary">
          Booking Date: {booking.bookingDate}
        </Typography>
        <Button
          variant="outlined"
          size="small"
          startIcon={<ConfirmationNumberIcon />}
          sx={{ mt: { xs: 1, sm: 0 } }} // Adds spacing on mobile
        >
          View Booking Info
        </Button>
      </Grid>
    </Card>
  );
};

const BookingList = () => {
  const [bookinghistory, setBookingHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const userDetails = useSelector((state) => state.userReducer.userDetails);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookingHistory = async () => {
      setLoading(true);
      const response = await get({
        url: `/bookings/booking-history/${userDetails?.userId}`,
      });

      setTimeout(() => {
        setBookingHistory(response.data);
        setLoading(false);
      }, 500);
    };

    fetchBookingHistory();
  }, []);

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      justifyContent="center"
      alignItems={"center"}
      gap="1.5rem"
      sx={{
        p: 3,
        background: "#f6f6f6",
        minHeight: "85vh", // Ensure the page has a minimum height
        // display: "flex",
        // flexDirection: "column",
        // alignItems: "center",
      }}
    >
      {/* Shimmer Loading Effect */}
      {loading &&
        Array.from({ length: 3 }).map((_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            width={600}
            height={300}
            sx={{ borderRadius: 2 }}
          />
        ))}

      {/* No Data Found Framer Motion Animation */}
      {!loading && bookinghistory.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" fontWeight="bold" color="text.secondary">
            No Booking Data Available
          </Typography>
          <Typography variant="body1" color="text.secondary" mt={1}>
            Looks like you haven't booked any tickets yet.
          </Typography>
          {/* <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          > */}
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/user/home")}
            sx={{ mt: 3 }}
          >
            Go to Home
          </Button>
          {/* </motion.div> */}
        </motion.div>
      )}

      {/* Display Booking Cards */}
      {!loading &&
        bookinghistory.length > 0 &&
        bookinghistory.map((booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))}
    </Box>
  );
};

export default BookingList;
