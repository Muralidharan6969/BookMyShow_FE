import React from "react";
import {
  Box,
  Typography,
  Link,
  Container,
  Grid,
  Divider,
  Stack,
  IconButton,
} from "@mui/material";
import { GitHub, LinkedIn, Mail, CreditCard } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

const UserFooter = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#1A1A1F",
        color: "#ffffff",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        {/* Top Section with Creator Info and Social Links */}
        <Grid container spacing={3} alignItems="center" sx={{ mb: 3 }}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{ textAlign: { xs: "center", md: "left" } }}
          >
            {/* <Typography variant="h6" sx={{ color: "#00BFFF", mb: 1, fontWeight: 600 }}>
              MovieTickets
            </Typography> */}
            <Typography variant="body2" sx={{ mb: 2 }}>
              Personal Project by{" "}
              <Link
                href="https://www.linkedin.com/in/muthiahmuralidharan/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: "#00BFFF",
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Muthiah Muralidharan
              </Link>
            </Typography>
            <Typography
              variant="body2"
              sx={{ opacity: 0.7, maxWidth: "1000px" }}
            >
              This project is inspired by platforms like BookMyShow and
              TicketNew. Built for learning purposes with React and Material UI.
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "flex-end" },
              }}
            >
              <Stack direction="row" spacing={2}>
                <IconButton
                  href="mailto:muralipkmsaravanan@gmail.com"
                  aria-label="Email"
                  sx={{ color: "#00BFFF" }}
                >
                  <Mail />
                </IconButton>
                <IconButton
                  href="https://github.com/Muralidharan6969/BookMyShow_FE"
                  target="_blank"
                  aria-label="GitHub"
                  sx={{ color: "#00BFFF" }}
                >
                  <GitHub />
                </IconButton>
                <IconButton
                  href="https://www.linkedin.com/in/muthiahmuralidharan/"
                  target="_blank"
                  aria-label="LinkedIn"
                  sx={{ color: "#00BFFF" }}
                >
                  <LinkedIn />
                </IconButton>
              </Stack>
            </Box>
          </Grid>
        </Grid>
        {/* Payment Information Section */}
        <Box
          sx={{
            py: 2,
            px: 3,
            mb: 3,
            borderRadius: 1,
            backgroundColor: "rgba(0, 191, 255, 0.1)",
            border: "1px solid rgba(0, 191, 255, 0.2)",
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          <Box sx={{ mb: { xs: 1, sm: 0 } }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: { xs: "center", sm: "flex-start" },
              }}
            >
              <CreditCard sx={{ color: "#00BFFF", mr: 1 }} />
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                Payment Information
              </Typography>
            </Box>
            <Typography variant="caption" sx={{ display: "block", mt: 0.5 }}>
              Payments are integrated using Stripe in test mode. No real
              transactions will occur.
            </Typography>
          </Box>
          <Link
            href="https://docs.stripe.com/testing?testing-method=card-numbers"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: "#00BFFF",
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
              mt: { xs: 1, sm: 0 },
              fontSize: "0.875rem",
              fontWeight: 500,
            }}
          >
            View Stripe Test Cards
          </Link>
        </Box>
        {/* {/* <Divider sx={{ bgcolor: "rgba(255, 255, 255, 0.1)" }} /> */}
        {/* Copyright Section */}
        {/* <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            pt: 2,
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          <Typography
            variant="caption"
            sx={{ opacity: 0.6, mb: { xs: 1, sm: 0 } }}
          >
            © {new Date().getFullYear()} Movie Tickets Project. All rights
            reserved.
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.6 }}>
            This is a demo website for portfolio purposes only.
          </Typography>
        </Box>{" "} */}
      </Container>
    </Box>
  );
};

export default UserFooter;
