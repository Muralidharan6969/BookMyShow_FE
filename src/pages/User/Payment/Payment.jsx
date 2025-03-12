import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Modal,
  Divider,
  IconButton,
  Paper,
  Stack,
} from "@mui/material";
import {
  AccessTime as AccessTimeIcon,
  LocationOn as LocationOnIcon,
  ConfirmationNumber as TicketIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { CardElement } from "@stripe/react-stripe-js";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { post } from "../../../app/api/apiConfig";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_TEST_PUBLIC_KEY);

// Move PaymentForm to a separate component
const PaymentForm = ({ onClose, bookingData, selectedSeats, showId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlePayment = async () => {
    if (!stripe || !elements) return;
    setLoading(true);
    setError("");

    const cardElement = elements.getElement(CardElement);

    try {
      const selectedSeatIds = selectedSeats.map((seat) =>
        Number(seat.showSeatMappingId)
      );

      const response = await post({
        url: "/stripe-booking/createPaymentIntent",
        data: {
          selectedSeats: selectedSeatIds,
          amount: bookingData.bookingSummary.totalAmount,
          currency: "inr",
          bookingId: bookingData.bookingId,
        },
      });

      if (!response.data.clientSecret) {
        throw new Error("Failed to create payment intent.");
      }

      const { paymentIntent, error } = await stripe.confirmCardPayment(
        response.data.clientSecret,
        {
          payment_method: { card: cardElement },
        }
      );

      if (error) {
        throw new Error(error.message);
      }

      if (paymentIntent.status === "succeeded") {
        const bookingResponse = await post({
          url: `/bookings/shows/${showId}/book-ticket`,
          data: {
            selectedSeats: selectedSeatIds,
            amount: bookingData.bookingSummary.totalAmount,
            currency: "inr",
            bookingId: bookingData.bookingId,
          },
        });

        if (bookingResponse.data) {
          onClose();
          navigate("/user/booking-confirmation", {
            state: bookingResponse.data,
          });
        } else {
          throw new Error("Booking failed, please contact support.");
        }
      }
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
        <CardElement
          options={{
            hidePostalCode: true,
            style: {
              base: { fontSize: "16px", color: "#424770" },
              invalid: { color: "#9e2146" },
            },
          }}
        />
      </Paper>

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      <Button
        variant="contained"
        fullWidth
        size="large"
        onClick={handlePayment}
        disabled={loading}
      >
        {loading
          ? "Processing..."
          : `Pay ₹${bookingData.bookingSummary.totalAmount.toFixed(2)}`}
      </Button>
    </Box>
  );
};

// Main PaymentScreen component
const PaymentScreen = ({ bookingData, selectedSeats, showId }) => {
  const theme = useTheme();
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  if (!bookingData) return <p>Loading...</p>;

  const { movieDetails, theatre, showDetails, bookingSummary } = bookingData;

  const PaymentModal = () => (
    <Modal
      open={showPaymentModal}
      onClose={() => setShowPaymentModal(false)}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper sx={{ maxWidth: 400, width: "100%", mx: 2, p: 3 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6" fontWeight="bold">
            Payment Details
          </Typography>
          <IconButton onClick={() => setShowPaymentModal(false)} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        <Elements stripe={stripePromise}>
          <PaymentForm
            onClose={() => setShowPaymentModal(false)}
            bookingData={bookingData}
            selectedSeats={selectedSeats}
            showId={showId}
          />
        </Elements>
      </Paper>
    </Modal>
  );

  return (
    <Box
      sx={{
        background: "#f6f6f6",
        minHeight: "calc(100vh - 150px)",
        pt: "3rem",
      }}
    >
      <Box sx={{ maxWidth: 500, mx: "auto" }}>
        <Card>
          <CardContent>
            {/* Movie Details Section */}
            <Box display="flex" gap={3}>
              <Box
                component="img"
                src={movieDetails.movieImageURL}
                alt="Movie Poster"
                sx={{
                  width: "158px",
                  height: "208px",
                  borderRadius: 1,
                  objectFit: "cover",
                }}
              />
              <Box flex={1}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  {movieDetails.title} ({movieDetails.ageRestriction})
                </Typography>

                <Stack spacing={2}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <LocationOnIcon color="action" />
                    <Box>
                      <Typography fontWeight="medium">
                        {theatre.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {theatre.location}
                      </Typography>
                    </Box>
                  </Box>

                  <Box display="flex" alignItems="center" gap={1}>
                    <AccessTimeIcon color="action" />
                    <Box>
                      <Typography fontWeight="medium">
                        {showDetails.date}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {showDetails.time}
                      </Typography>
                    </Box>
                  </Box>

                  <Box display="flex" alignItems="center" gap={1}>
                    <TicketIcon color="action" />
                    <Box>
                      {showDetails.seatCategories.map((category, index) => (
                        <Typography key={index} fontWeight="medium">
                          {category.seatType}: {category.seatNumbers.join(", ")}
                        </Typography>
                      ))}
                    </Box>
                  </Box>
                </Stack>
              </Box>
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* Booking Summary Section */}
            <Box sx={{ maxWidth: 400, mx: "auto" }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Booking Summary
              </Typography>

              <Stack spacing={2} sx={{ mt: 2 }}>
                {bookingSummary.categoryPrices.map((category, index) => (
                  <Box
                    key={index}
                    display="flex"
                    justifyContent="space-between"
                  >
                    <Typography color="text.secondary">
                      {category.seatType} ({category.ticketCount} Tickets)
                    </Typography>
                    <Typography>₹{category.totalPrice.toFixed(2)}</Typography>
                  </Box>
                ))}

                <Box display="flex" justifyContent="space-between">
                  <Typography color="text.secondary">
                    Convenience Fee
                  </Typography>
                  <Typography>
                    ₹{bookingSummary.convenienceFee.toFixed(2)}
                  </Typography>
                </Box>

                <Divider />

                <Box display="flex" justifyContent="space-between">
                  <Typography variant="h6" fontWeight="bold">
                    Total Amount
                  </Typography>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    color="success.main"
                  >
                    ₹{bookingSummary.totalAmount.toFixed(2)}
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  sx={{
                    mt: 1,
                    bgcolor: theme.palette.primary.main,
                  }}
                  onClick={() => setShowPaymentModal(true)}
                  disableRipple
                >
                  Proceed to Pay
                </Button>
              </Stack>
            </Box>
          </CardContent>
        </Card>
        <PaymentModal />
      </Box>
    </Box>
  );
};

export default PaymentScreen;
