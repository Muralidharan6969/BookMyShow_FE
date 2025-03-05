import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ErrorPage = ({ error, resetErrorBoundary }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    const userType = sessionStorage.getItem("userType");
    switch (userType) {
      case "user":
        navigate("/user/home");
        break;
      case "outlet":
        navigate("/outlet/home");
        break;
      case "admin":
        navigate("/admin/home");
        break;
      default:
        navigate("/user/login");
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      textAlign="center"
      sx={{ background: "#f6f6f6", p: 3 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h2" color="error" fontWeight="bold">
          Oops! Something went wrong.
        </Typography>
        <Typography variant="body1" color="text.secondary" mt={2}>
          We couldn't process your request. Please try again later.
        </Typography>
      </motion.div>

      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 3, mr: 2 }}
          onClick={handleButtonClick}
        >
          Go to Home
        </Button>
        {/* {resetErrorBoundary && (
          <Button
            variant="outlined"
            color="secondary"
            sx={{ mt: 3 }}
            onClick={resetErrorBoundary}
          >
            Try Again
          </Button>
        )} */}
      </motion.div>
    </Box>
  );
};

export default ErrorPage;
