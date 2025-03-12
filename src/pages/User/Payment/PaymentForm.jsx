import React, { useState } from "react";
import {
  Box,
  Card,
  Typography,
  Button,
  Divider,
  CircularProgress,
} from "@mui/material";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { post } from "../../../app/api/apiConfig";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePayment = async () => {
    if (!stripe || !elements) return;
    setLoading(true);
    setError("");

    const cardElement = elements.getElement(CardElement);

    try {
      // Step 1: Create Payment Intent on Backend
      const response = await post({
        url: "/stripe-booking/createPaymentIntent",
        data: {
          amount: 36910,
          currency: "inr",
        },
      });

      // Step 2: Confirm Payment
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        data.clientSecret,
        {
          payment_method: { card: cardElement },
        }
      );

      if (error) {
        setError(error.message);
      } else if (paymentIntent.status === "succeeded") {
        alert("Payment Successful!");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{ width: "100%", maxWidth: 500, p: 3, borderRadius: 2, boxShadow: 3 }}
    >
      <Typography variant="h6" fontWeight="bold">
        Pay using Card
      </Typography>

      <Card sx={{ p: 2, mt: 2 }}>
        <CardElement
          options={{
            hidePostalCode: true,
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": { color: "#aab7c4" },
                padding: "10px 14px",
              },
              invalid: { color: "#9e2146" },
            },
          }}
        />
      </Card>

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2, py: 1.5 }}
        onClick={handlePayment}
        disabled={!stripe || loading}
      >
        {loading ? <CircularProgress size={24} /> : "Make Payment"}
      </Button>
    </Box>
  );
};

export default PaymentForm;
