import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Showgo from "../../../assets/Showgo_1.png";
import { useTheme } from "@emotion/react";

const AuthWrapper = ({ children, title, description, link, linkText }) => {
  const theme = useTheme();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      gap={3}
      px={3}
      bgcolor={theme.palette.background.default} // Subtle background color
    >
      {/* Logo Section */}
      <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
        <img src={Showgo} alt="App Logo" width="200" height="auto" />
        {/* <Typography variant="h5" fontWeight="bold" mt={1}>
          Welcome to ShowGo
        </Typography> */}
      </Box>

      {/* Card Wrapper for Form */}
      <Box
        maxWidth="30vw"
        width="100%"
        p={4}
        borderRadius={2}
        boxShadow={2}
        bgcolor="white"
        display="flex"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
      >
        <Typography variant="h6" fontWeight="bold" color="primary" mb={1}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          {description}
        </Typography>

        {children}
      </Box>

      {/* Footer Link */}
      {link && (
        <Typography color="text.secondary">
          <Link to={link}>{linkText}</Link>
        </Typography>
      )}
    </Box>
  );
};

export default AuthWrapper;
