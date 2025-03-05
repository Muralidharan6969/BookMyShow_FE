import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { showSeatlayout } from "./ShowSeatLayout.helper";
import { useTheme } from "@emotion/react";
import TvIcon from "@mui/icons-material/Tv";
import SeatLayoutHeader from "./SeatLayoutHeader";
import SeatSelectionModal from "./SeatSelectionModal";
import { useNavigate, useParams } from "react-router-dom";
import { get, post } from "../../../app/api/apiConfig";
import { useSelector } from "react-redux";
import PaymentScreen from "./Payment";
import TicketLoader from "./TicketLoader";

const ShowSeatLayout = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [selectedSeatCount, setSelectedSeatCount] = useState(1);
  const [showSeatLayouts, setShowSeatLayouts] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [remainingSeats, setRemainingSeats] = useState(selectedSeatCount);
  const { showId, movieId, movieName } = useParams();
  const navigate = useNavigate();
  const cityDetails = useSelector((state) => state.userReducer.city);
  const [isBlockSuccessful, setIsBlockSuccessful] = useState(false);
  const [bookingData, setBookingData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [refresh, setRefresh] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const handlePayNow = async () => {
    console.log("handlePayNow called");
    setIsLoading(true);
    setErrorMessage("");

    try {
      const selectedSeatIds = selectedSeats.map(
        (seat) => seat.showSeatMappingId
      );

      await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await post({
        url: `/theatres/shows/${showId}/block-seats`,
        data: {
          showSeatIds: selectedSeatIds,
        },
      });

      console.log("API Response:", response);

      if (
        response?.message === "Seats have been blocked successfully!" &&
        response?.data
      ) {
        console.log("Navigating to Payment Screen");
        setBookingData(response.data);
        setIsBlockSuccessful(true);
        setIsLoading(false);
        // navigate("/user/paymentScreen", { state: response.data });
      } else {
        console.error("Unexpected response format:", response);
        setErrorMessage(
          "Selected seats are no longer available. Please choose different seat(s)."
        );
        setRefresh((prev) => !prev);
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  const fetchSeatLayout = async () => {
    const response = await get({
      url: `/theatres/shows/${showId}/seat-layout`,
    });
    console.log("response.data", response.data);
    setShowSeatLayouts(response.data);
  };

  useEffect(() => {
    if (isFirstLoad) {
      fetchSeatLayout();
      setIsFirstLoad(false);
    } else if (refresh) {
      fetchSeatLayout();
      setRefresh(false);
    }
  }, [refresh]);

  const handleBackClick = () => {
    navigate(
      `/user/${cityDetails?.cityName}/movies/${movieName}/${movieId}/buyTickets`
    );
  };

  const handleErrorModalButtonCLick = () => {
    setRefresh(true);
    setErrorMessage("");
    setSelectedSeats([]);
  };

  const handleSeatSelection = (seatObj) => {
    if (seatObj.seatStatus !== "AVAILABLE") return;

    setSelectedSeats((prevSelectedSeats) => {
      let updatedSeats = [];
      let newRemainingSeats =
        selectedSeatCount - prevSelectedSeats.length || selectedSeatCount;

      console.log("selectedSeatCount at start of function", selectedSeatCount);
      console.log("prevSelectedSeats at start of function", prevSelectedSeats);
      console.log("newRemainingSeats at start of function", newRemainingSeats);

      const rowSeats = showSeatLayouts
        .filter((seat) => seat.seatRow === seatObj.seatRow)
        .sort((a, b) => a.seatCol - b.seatCol);

      const clickedIndex = rowSeats.findIndex(
        (seat) => seat.showSeatMappingId === seatObj.showSeatMappingId
      );

      for (
        let i = clickedIndex;
        i < rowSeats.length && updatedSeats.length < newRemainingSeats;
        i++
      ) {
        const seat = rowSeats[i];
        if (seat.seatStatus !== "SELECTED" && seat.seatStatus !== "AVAILABLE")
          break;
        updatedSeats.push(seat);
      }

      console.log("updatedSeats after bulk seat selection", updatedSeats);

      if (updatedSeats.length === selectedSeatCount) {
        prevSelectedSeats = prevSelectedSeats.filter(
          (seat) =>
            !updatedSeats.some(
              (s) => s.showSeatMappingId === seat.showSeatMappingId
            )
        );
      } else {
        if (prevSelectedSeats.length !== selectedSeatCount) {
          updatedSeats = [...updatedSeats, ...prevSelectedSeats];
        }
      }

      console.log("prevSelectedSeats after filtering", prevSelectedSeats);
      console.log("updatedSeats after filtering", updatedSeats);

      setShowSeatLayouts((prevLayouts) =>
        prevLayouts.map((seat) => {
          if (
            prevSelectedSeats.some(
              (s) => s.showSeatMappingId === seat.showSeatMappingId
            ) &&
            !updatedSeats.some(
              (s) => s.showSeatMappingId === seat.showSeatMappingId
            )
          ) {
            return { ...seat, seatStatus: "AVAILABLE" };
          } else if (
            updatedSeats.some(
              (s) => s.showSeatMappingId === seat.showSeatMappingId
            )
          ) {
            return { ...seat, seatStatus: "SELECTED" };
          }
          return seat;
        })
      );

      return updatedSeats;
    });
  };

  const groupedSeats = showSeatLayouts?.reduce((acc, seat) => {
    if (!acc[seat.seatType]) {
      acc[seat.seatType] = [];
    }
    acc[seat.seatType].push(seat);
    return acc;
  }, {});

  const handleSeatCountSelection = (seatCount) => {
    setSelectedSeatCount(seatCount);
    setOpen(false);
  };

  console.log("selectedSeats", selectedSeats);

  useEffect(() => {
    setSelectedSeats([]);
    setShowSeatLayouts((prevLayout) =>
      prevLayout.map((seat) => {
        if (seat.seatStatus === "SELECTED") {
          return { ...seat, seatStatus: "AVAILABLE" };
        }
        return seat;
      })
    );

    console.log("selectedSeatCount changed, resetting selectedSeats...");
  }, [selectedSeatCount]);

  return (
    <>
      {/* Seat Selection Modal */}
      {!isBlockSuccessful && (
        <SeatSelectionModal
          open={open}
          onClose={(seatCount) => handleSeatCountSelection(seatCount)}
        />
      )}

      {/* SeatLayoutHeader with sticky positioning */}
      <Box
        position="sticky"
        top={0}
        zIndex={20}
        width="100%"
        bgcolor="white"
        boxShadow="0px 2px 5px rgba(0,0,0,0.1)"
      >
        <SeatLayoutHeader
          selectedSeatCount={selectedSeatCount}
          setOpen={setOpen}
          handleBackClick={handleBackClick}
          showId={showId}
          isBlockSuccessful={isBlockSuccessful}
        />
      </Box>

      {/* Main content section */}
      {!isBlockSuccessful ? (
        <>
          <Box
            display="flex"
            flexDirection="column"
            width="100%"
            margin="0"
            sx={{ background: "#fafafa" }}
            gap="1.5rem"
            height="calc(100vh - 80px)"
            overflow="auto"
          >
            {/* Remaining Seats Information */}
            <Box textAlign="center" height={"15px"}>
              <span
                style={{
                  color: "#f2f2f2",
                  fontSize: theme.typography.body2.fontSize,
                  padding: "4px 8px",
                  background: "#1f2533",
                  border: "1px solid #1f2533",
                  borderBottomLeftRadius: "5px",
                  borderBottomRightRadius: "5px",
                }}
              >
                7 Seats Remaining
              </span>
            </Box>

            {/* Seat Layout */}
            <Box
              display="flex"
              flexDirection="column"
              gap={2}
              alignItems="center"
            >
              {Object.entries(groupedSeats).map(([seatType, seats]) => {
                const rows = [
                  ...new Set(seats.map((seat) => seat.seatRow)),
                ].sort((a, b) => a - b);

                return (
                  <Box key={seatType} width="100%" textAlign="center">
                    {/* Legend Row */}
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      p={1}
                      color="black"
                    >
                      <Typography variant="body1" fontWeight="bold">
                        {seatType} - ₹{seats[0]?.price}
                      </Typography>
                    </Box>

                    {/* Seat Rows */}
                    {rows.map((row) => {
                      const rowSeats = seats.filter(
                        (seat) => seat.seatRow === row
                      );
                      return (
                        <Box
                          key={row}
                          display="flex"
                          justifyContent="center"
                          gap={1}
                          mt={1}
                        >
                          {rowSeats.map((seat) => (
                            <Box
                              key={seat.showSeatMappingId}
                              width="30px"
                              height="30px"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              color={
                                seat.seatStatus === "AVAILABLE"
                                  ? theme.palette.primary.main
                                  : "white"
                              }
                              border="1px solid #000"
                              borderColor={
                                seat.seatStatus === "AVAILABLE" ||
                                seat.seatStatus === "SELECTED"
                                  ? theme.palette.primary.main
                                  : "none"
                              }
                              borderRadius="3px"
                              fontSize="12px"
                              fontWeight="bold"
                              onClick={() => handleSeatSelection(seat)}
                              sx={{
                                ":hover": {
                                  backgroundColor:
                                    seat.seatStatus === "AVAILABLE" ||
                                    seat.seatStatus === "SELECTED"
                                      ? theme.palette.primary.main
                                      : "gray",
                                  color: "white",
                                  cursor:
                                    seat.seatStatus === "AVAILABLE" ||
                                    seat.seatStatus === "SELECTED"
                                      ? "pointer"
                                      : "default",
                                },
                                backgroundColor:
                                  seat.seatStatus === "SELECTED"
                                    ? theme.palette.primary.main
                                    : seat.seatStatus !== "AVAILABLE"
                                    ? "gray"
                                    : "white",
                              }}
                            >
                              {seat.seatNumber}
                            </Box>
                          ))}
                        </Box>
                      );
                    })}
                  </Box>
                );
              })}
            </Box>

            {/* Screen Section */}
            <Box
              position="sticky"
              bottom={selectedSeats.length === selectedSeatCount ? "60px" : "0"}
              left={0}
              zIndex={selectedSeats.length === selectedSeatCount ? 5 : 1}
              width="100%"
              sx={{
                background: "#fafafa",
              }}
              textAlign="center"
              py={1}
            >
              <Box display="flex" justifyContent="center" mt={1}>
                <img src="https://assetscdn1.paytm.com/movies_new/_next/static/media/screen-icon.8dd7f126.svg" />
              </Box>
            </Box>
          </Box>

          {/* Proceed to Pay Button */}
          {selectedSeats.length === selectedSeatCount && (
            <Box
              position="fixed"
              bottom={0}
              left={0}
              width="100%"
              bgcolor="white"
              color="black"
              p={2}
              display="flex"
              justifyContent="space-evenly"
              alignItems="center"
              boxShadow="0px -2px 10px rgba(0, 0, 0, 0.1)"
              zIndex={10}
            >
              <Typography fontSize={theme.typography.body2.fontSize}>
                Total: ₹
                {selectedSeats.reduce((sum, seat) => sum + seat.price, 0)}
              </Typography>
              <Box
                p={1.5}
                bgcolor={theme.palette.primary.main}
                color="white"
                borderRadius="5px"
                fontSize={theme.typography.body2.fontSize}
                fontWeight={theme.typography.body2.fontWeight}
                sx={{ cursor: "pointer" }}
                onClick={handlePayNow}
              >
                Proceed to Pay
              </Box>
            </Box>
          )}
        </>
      ) : (
        <PaymentScreen
          bookingData={bookingData}
          selectedSeats={selectedSeats}
          showId={showId}
        />
      )}

      {/* Loader Modal */}
      <TicketLoader
        open={isLoading || !!errorMessage}
        errorMessage={errorMessage}
        handleRefresh={handleErrorModalButtonCLick}
      />
    </>
  );
};

export default ShowSeatLayout;
