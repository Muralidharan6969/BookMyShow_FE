import { useTheme } from "@emotion/react";
import { Box, Typography, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();
  const theme = useTheme();
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
      height="85vh"
      textAlign="center"
      sx={{ background: "#f6f6f6" }}
      p={3}
    >
      {/* Animated 404 heading */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Typography
          variant="h1"
          fontWeight="bold"
          color={theme.palette.error.main}
        >
          404
        </Typography>
      </motion.div>

      {/* Animated "Oops! The page..." text */}
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Typography
          fontSize={theme.typography.h8.fontSize}
          fontWeight={theme.typography.h8.fontWeight}
          mt={2}
        >
          Oops! The page you are looking for doesn't exist.
        </Typography>
      </motion.div>

      {/* Animated secondary text
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Typography
          fontSize={theme.typography.h9.fontSize}
          fontWeight={theme.typography.h9.fontWeight}
          mt={1}
          color="text.secondary"
        >
          The page you are looking for doesn't exist.
        </Typography>
      </motion.div> */}

      {/* Animated button with hover effect */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          onClick={handleButtonClick}
        >
          Go to Home
        </Button>
      </motion.div>
    </Box>
  );
};

export default NotFound;
