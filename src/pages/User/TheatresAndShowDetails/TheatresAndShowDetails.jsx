import { useTheme } from "@emotion/react";
import { Box, Button, Icon, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import TheatresAndShowCard from "./TheatresAndShowCard";
import DateSlick from "../../../components/common/DateSlick";
import ShowtimeFilter from "./ShowTimeFilter";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { get } from "../../../app/api/apiConfig";
import MovieDetailSkeleton from "../../../components/skeletons/MovieDetailSkeleton";
import DatesPickerSkeleton from "../../../components/common/DatesPickerSkeleton";
import TheatreShowDetailsSkeleton from "../../../components/skeletons/TheatreShowDetailsSkeleton";
import { motion } from "framer-motion";
import MovieImage from "../../../assets/Film rolls-rafiki.svg";

const TheatresAndShowDetails = () => {
  const theme = useTheme();
  const { movieId, cityName, movieName } = useParams();
  const cityDetails = useSelector((state) => state.userReducer.city);
  const [movieDetails, setMovieDetails] = useState({});
  const [availableDates, setAvailableDates] = useState([]);
  const [theatreShowDetails, setTheatreShowDetails] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredTheatreShowDetails, setFilteredTheatreShowDetails] = useState(
    []
  );
  const [isMovieLoading, setIsMovieLoading] = useState(true);
  const [isDatesLoading, setIsDatesLoading] = useState(true);
  const [isTheatreLoading, setIsTheatreLoading] = useState(true);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const navigate = useNavigate();

  const handleShowtimeFilter = (timeRange) => {
    if (!timeRange || timeRange.length < 2) {
      setIsFilterApplied(false);
      setFilteredTheatreShowDetails(theatreShowDetails);
      return;
    }

    const [startTime, endTime] = timeRange.map(Number);

    const updatedTheatres = theatreShowDetails
      .map((theatre) => {
        const filteredShows = theatre.shows.filter((show) => {
          const showHour = parseInt(show.showStartTime.split(":")[0], 10);
          return showHour >= startTime && showHour < endTime;
        });

        return filteredShows.length > 0
          ? { ...theatre, shows: filteredShows }
          : null;
      })
      .filter(Boolean);

    setIsFilterApplied(true);
    setFilteredTheatreShowDetails(updatedTheatres);
  };

  const fetchMovieDetails = async (movieId) => {
    setIsMovieLoading(true);
    const response = await get({ url: `/movies/${movieId}` });

    setTimeout(() => {
      setMovieDetails(response.data);
      setIsMovieLoading(false);
    }, 500);
  };

  const fetchDatesForMovieAndCity = async (movieId, cityId) => {
    setIsDatesLoading(true);
    const response = await get({
      url: `/theatres/movies/${movieId}/city/${cityId}/dates`,
    });

    setTimeout(() => {
      setAvailableDates(response.data);
      setIsDatesLoading(false);
    }, 500);
  };

  const fetchTheatresAndShowsForMovie = async (
    movieId,
    cityId,
    selectedDate
  ) => {
    setIsTheatreLoading(true);
    const response = await get({
      url: `/theatres/movies/${movieId}/city/${cityId}/date/${selectedDate}`,
    });

    setTimeout(() => {
      setTheatreShowDetails(response.data);
      setFilteredTheatreShowDetails(response.data);
      setIsTheatreLoading(false);
    }, 500);
  };

  useEffect(() => {
    fetchMovieDetails(movieId);

    if (cityDetails?.cityId) {
      fetchDatesForMovieAndCity(movieId, cityDetails.cityId);
      setIsFilterApplied(false);
    }
  }, [movieId, cityDetails]);

  useEffect(() => {
    if (availableDates.length > 0) {
      setSelectedDate(availableDates[0]?.date);
    }
  }, [availableDates]);

  useEffect(() => {
    if (cityDetails?.cityId && selectedDate) {
      fetchTheatresAndShowsForMovie(movieId, cityDetails.cityId, selectedDate);
      setIsFilterApplied(false);
    }
  }, [selectedDate, cityDetails]);

  useEffect(() => {
    setIsFilterApplied(false);
    navigate(
      `/user/${cityDetails.cityName}/movies/${movieName}/${movieId}/buyTickets`
    );
  }, [cityDetails]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dateSelection = (dateObj) => {
    setSelectedDate(String(dateObj?.date));
  };

  return (
    <Box>
      {/* Movie Header Section */}
      {isMovieLoading ? (
        <MovieDetailSkeleton />
      ) : (
        <Box
          sx={{
            borderBottom: "1px solid #d0d5e6",
            boxSizing: "border-box",
            // background: "#fff",
          }}
          display={"flex"}
          justifyContent={"center"}
        >
          {/* ... keep existing header content ... */}
          <Box
            p={"20px 0px"}
            width={"85%"}
            display={"flex"}
            justifyContent={"flex-start"}
          >
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              gap={"0.875rem"}
              width={"60%"}
            >
              <Box>
                <Typography
                  fontSize={theme.typography.h4.fontSize}
                  fontWeight={theme.typography.h4.fontWeight}
                >
                  {movieDetails?.movieName} ({movieDetails?.language})
                </Typography>
              </Box>
              <Box
                display={"flex"}
                justifyContent={"center"}
                flexDirection={"column"}
                gap={"0.875rem"}
              >
                <Typography
                  fontSize={theme.typography.h9.fontSize}
                  fontWeight={theme.typography.h9.fontWeight}
                  color="#7e7e7e"
                >
                  {`${movieDetails?.movieCertificate} - ${movieDetails?.movieDuration}`}
                </Typography>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-start"
                  gap="10px"
                >
                  {movieDetails?.genres &&
                    movieDetails.genres.length > 0 &&
                    movieDetails?.genres?.map((genre) => (
                      <Box
                        key={genre}
                        fontSize="10px"
                        color="#7e7e7e"
                        padding="2px 8px"
                        borderRadius="11px"
                        border="1px solid #7e7e7e"
                        textTransform="uppercase"
                        display="inline-block"
                      >
                        {genre}
                      </Box>
                    ))}
                </Box>
                <Typography
                  fontSize={theme.typography.h9.fontSize}
                  fontWeight={theme.typography.h9.fontWeight}
                  color="hsl(0deg 0% 6% / 54%)"
                >
                  {movieDetails?.movieDescription}
                </Typography>
              </Box>
            </Box>
            <Box display={"flex"} justifyContent={"flex-end"} width={"40%"}>
              <Box
                width={"158px"}
                height={"208px"}
                borderRadius={"8px"}
                sx={{
                  backgroundImage: `url(${movieDetails?.movieImageURL})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              />
            </Box>
          </Box>
        </Box>
      )}

      {/* Date Picker Section */}
      {isDatesLoading ? (
        <DatesPickerSkeleton />
      ) : (
        (filteredTheatreShowDetails.length !== 0 ||
          (filteredTheatreShowDetails.length === 0 && isFilterApplied)) && (
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            p={"20px 20px"}
            sx={{
              background: "#f2f2f2",
            }}
            borderBottom={"1px solid #d0d5e6"}
            position={"sticky"}
            top={"82px"}
            zIndex={50}
            // boxShadow={"0px 4px 10px rgba(0,0,0,0.1)"}
          >
            <Box
              sx={{
                width: "85%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  width: "30%",
                  position: "relative",
                  "& > div": {
                    // Target DateSlick container
                    justifyContent: "flex-start !important",
                    alignItems: "flex-start !important",
                  },
                }}
              >
                <DateSlick
                  showOnlyFutureDates={false}
                  movieDates={availableDates}
                  dateSelection={dateSelection}
                />
              </Box>

              {/* Language Selection */}
              <Box
                sx={{
                  width: "30%",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  // pr: 2,
                  gap: "1rem",
                }}
              >
                <Typography
                  fontSize={theme.typography.body1.fontSize}
                  fontWeight={theme.typography.body1.fontWeight}
                >
                  Filter By
                </Typography>
                <ShowtimeFilter onFilterChange={handleShowtimeFilter} />
              </Box>
            </Box>
          </Box>
        )
      )}

      {/* Theatre List Section */}
      {isTheatreLoading ? (
        <TheatreShowDetailsSkeleton />
      ) : filteredTheatreShowDetails.length === 0 ? (
        <Box
          display={"flex"}
          justifyContent={"center"}
          p={"20px 0px"}
          sx={{ minHeight: "1000px", background: "#f2f2f2" }}
        >
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            minHeight={"400px"}
            width={"85%"}
            sx={{ background: "white" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                gap={3}
                p={3}
                textAlign="center"
              >
                <img
                  src={MovieImage}
                  alt="No schedules available"
                  width={200}
                  height={200}
                />
                <Typography
                  fontSize={theme.typography.h9.fontSize}
                  fontWeight={theme.typography.h9.fontWeight}
                  color="hsl(0deg 0% 6% / 54%)"
                >
                  {!isFilterApplied
                    ? `No schedules are available for the selected movie in `
                    : `No schedules are available for the selected movie, date and time filters in `}
                  <Typography
                    fontSize={theme.typography.h9.fontSize}
                    component="span"
                    color="primary"
                  >
                    {cityDetails.cityName}
                  </Typography>{" "}
                  {!isFilterApplied
                    ? `right now!`
                    : `right now. Kindly reset filters to proceed!`}
                </Typography>
              </Box>
            </motion.div>
          </Box>
        </Box>
      ) : (
        <Box
          display={"flex"}
          justifyContent={"center"}
          p={"20px 0px"}
          sx={{
            minHeight: "1000px",
            background: "#f2f2f2",
          }}
        >
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"flex-start"}
            minHeight={"650px"}
            width={"85%"}
            sx={{
              background: "white",
            }}
          >
            {/* Availability Legend */}

            <Box
              display={"flex"}
              justifyContent={"flex-end"}
              alignItems={"center"}
              borderBottom={"1px solid #f2f2f2"}
              sx={{ background: "white" }}
              gap={"15px"}
              width={"100%"}
            >
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={"10px"}
                padding={"5px 5px 5px 5px"}
              >
                <Box
                  padding={"4px"}
                  borderRadius={"4px"}
                  sx={{ background: "#4abd5d" }}
                />
                <Typography
                  color="#717171"
                  textTransform={"uppercase"}
                  fontSize={theme.typography.body3.fontSize}
                  fontWeight={theme.typography.body3.fontWeight}
                >
                  Available
                </Typography>
              </Box>
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={"10px"}
                padding={"5px 5px 5px 5px"}
              >
                <Box
                  padding={"4px"}
                  borderRadius={"4px"}
                  sx={{ background: "#f60" }}
                />
                <Typography
                  color="#717171"
                  textTransform={"uppercase"}
                  fontSize={theme.typography.body3.fontSize}
                  fontWeight={theme.typography.body3.fontWeight}
                >
                  Fast Filling
                </Typography>
              </Box>
            </Box>

            {/* Theatre Cards */}
            {filteredTheatreShowDetails &&
              filteredTheatreShowDetails.length > 0 &&
              filteredTheatreShowDetails?.map((theatreObj, index) => (
                <TheatresAndShowCard
                  key={index}
                  theatreObj={theatreObj}
                  movieName={movieName}
                  movieId={movieId}
                />
              ))}
            {/* <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              background: "white",
            }}
          >
            <Box
              sx={{
                display: "grid",
                gap: 2,
                pb: 1,
              }}
            >
              {theatreShowDetails &&
                theatreShowDetails.length > 0 &&
                theatreShowDetails?.map((theatreObj, index) => (
                  <TheatresAndShowCard key={index} theatreObj={theatreObj} />
                ))}
            </Box>
          </Box> */}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default TheatresAndShowDetails;
