import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  Avatar,
  Divider,
  Tabs,
  Tab,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  History as HistoryIcon,
  Edit as EditIcon,
} from "@mui/icons-material";

const UserProfile = () => {
  const { name, email, mobileNumber } = useSelector(
    (state) => state.userReducer.userDetails
  );

  const navigate = useNavigate();

  const handleBookingHistoryRedirect = () => {
    navigate("/user/booking-history");
  };

  return (
    <Box
      sx={{
        minHeight: "90vh",
        backgroundColor: "#f5f5f5",
        py: 4,
        px: { xs: 2, md: 4 },
      }}
    >
      <Box
        sx={{
          maxWidth: "800px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        {/* Header Section */}
        <Paper
          elevation={2}
          sx={{
            p: 4,
            borderRadius: 2,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            gap: 3,
          }}
        >
          <Avatar
            sx={{
              width: 120,
              height: 120,
              bgcolor: "primary.main",
              fontSize: "3rem",
            }}
          >
            {name?.charAt(0).toUpperCase()}
          </Avatar>

          <Box sx={{ flex: 1, textAlign: { xs: "center", sm: "left" } }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {name}
            </Typography>
            <Button
              startIcon={<EditIcon />}
              variant="outlined"
              size="small"
              sx={{ mt: 1 }}
              disabled
            >
              Edit Profile
            </Button>
          </Box>
        </Paper>

        {/* Details Section */}
        <Paper
          elevation={2}
          sx={{
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              pb: 2,
              borderBottom: "2px solid",
              borderColor: "primary.main",
            }}
          >
            Contact Information
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <EmailIcon color="primary" />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Email Address
                </Typography>
                <Typography variant="body1">{email}</Typography>
              </Box>
            </Box>

            <Divider />

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <PhoneIcon color="primary" />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Mobile Number
                </Typography>
                <Typography variant="body1">{mobileNumber}</Typography>
              </Box>
            </Box>
          </Box>
        </Paper>

        {/* Actions Section */}
        <Paper
          elevation={2}
          sx={{
            p: 4,
            borderRadius: 2,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography variant="h6" gutterBottom>
              Booking History
            </Typography>
            <Typography variant="body2" color="text.secondary">
              View all your past bookings and tickets
            </Typography>
          </Box>

          <Button
            variant="contained"
            size="large"
            startIcon={<HistoryIcon />}
            onClick={handleBookingHistoryRedirect}
            sx={{
              minWidth: 200,
              py: 1.5,
            }}
          >
            View History
          </Button>
        </Paper>
      </Box>
    </Box>
  );
};

export default UserProfile;
