import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { get } from "../../../app/api/apiConfig";
import { useSelector } from "react-redux";
import { useTheme } from "@emotion/react";
import SliderBanner from "../../../components/common/MovieCard/SliderBanner";
import MovieCard from "../../../components/common/MovieCard/MovieCard";
import Button from "../../../components/common/buttons/Button";
import MovieListShimmer from "../ShimmerComponents/MovieListShimmer";
import SliderBannerShimmer from "../ShimmerComponents/SliderBannerShimmer";
import { motion } from "framer-motion";
import NoMoviesImage from "../../../assets/Popcorns-pana.svg";

const UserHomePage = () => {
  const cityDetails = useSelector((state) => state.userReducer.city);
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = useState("nowShowing");

  const [listAllMoviesForCity, setListAllMoviesForCity] = useState([]);
  const [listAllLanguages, setListAllLanguages] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  // Loading states
  const [isBannerLoading, setIsBannerLoading] = useState(true);
  const [isMoviesLoading, setIsMoviesLoading] = useState(true);

  const handleCategoryChange = (event, newCategory) => {
    if (newCategory) setSelectedCategory(newCategory);
  };

  const fetchPopularMovies = async () => {
    setIsBannerLoading(true);
    const response = await get({ url: `/movies/popular` });

    setTimeout(() => {
      setPopularMovies(response.data.moviesArray);
      setIsBannerLoading(false);
    }, 500); // Ensuring minimum shimmer duration
  };

  const fetchMoviesForCity = async (cityId, category) => {
    setIsMoviesLoading(true);
    const endpoint =
      category === "nowShowing"
        ? `/movies/cities/${cityId}`
        : `/movies/upcoming/cities/${cityId}`;
    const response = await get({ url: endpoint });

    setTimeout(() => {
      setListAllLanguages(response.data.languages);
      setListAllMoviesForCity(response.data.moviesArray);
      setIsMoviesLoading(false);
    }, 500); // Minimum shimmer duration
  };

  useEffect(() => {
    if (cityDetails?.cityId) {
      fetchMoviesForCity(cityDetails.cityId, selectedCategory);
    }
  }, [cityDetails, selectedCategory]);

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  const handleLanguageSelection = (language) => {
    setSelectedLanguages((prev) => {
      const newSelection = prev.includes(language)
        ? prev.filter((lang) => lang !== language)
        : [...prev, language];

      return [...newSelection];
    });
  };

  const filteredMovies =
    selectedLanguages.length === 0
      ? listAllMoviesForCity
      : listAllMoviesForCity.filter((movie) =>
          selectedLanguages.includes(movie.language)
        );

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      gap="1rem"
      sx={{ background: "#f6f6f6" }}
    >
      {/* Slider Banner */}
      <Box
        display="flex"
        justifyContent="center"
        sx={{ background: "#f1f1f1" }}
      >
        {isBannerLoading ? (
          <SliderBannerShimmer />
        ) : (
          <SliderBanner moviesArray={popularMovies} />
        )}
      </Box>

      {cityDetails && (
        <Box
          display="flex"
          justifyContent="center"
          sx={{ background: "#f6f6f6" }}
        >
          <ToggleButtonGroup
            value={selectedCategory}
            exclusive
            onChange={handleCategoryChange}
            sx={{
              backgroundColor: "#e7f1f8",
              borderRadius: 2,
              p: 0.5,
              "& .MuiToggleButton-root": {
                backgroundColor: "#e7f1f8",
                color: "#000",
                px: 3,
                border: "none",
                transition: "all 0.3s ease-in-out",
                textTransform: "none",
              },
              "& .MuiToggleButton-root.Mui-selected": {
                backgroundColor: "white",
                color: "#000",
                borderRadius: "8px",
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                fontWeight: "bold",
              },
            }}
          >
            <ToggleButton value="nowShowing" disableRipple>
              Now Showing
            </ToggleButton>
            <ToggleButton value="comingSoon" disableRipple>
              Coming Soon
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      )}

      {/* Movie List Section */}
      <Box
        display="flex"
        justifyContent="center"
        sx={{ background: "#f6f6f6" }}
        marginBottom={"1rem"}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          // gap="2rem"
          width="85%"
          paddingLeft="1rem"
          paddingRight="1rem"
          sx={{ background: "#f6f6f6", borderRadius: "1rem" }}
          minHeight={"650px"}
        >
          {isMoviesLoading ? (
            <MovieListShimmer />
          ) : listAllMoviesForCity.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                // width="85%"
                padding="2rem"
                sx={{
                  background: "white",
                  borderRadius: "1rem",
                  textAlign: "center",
                  // boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                }}
              >
                {/* Illustration */}
                <img
                  src={NoMoviesImage}
                  alt="No Movies Available"
                  style={{ width: "200px", marginBottom: "1rem" }}
                />

                {/* Dynamic Message */}
                <Typography
                  fontSize={theme.typography.h8.fontSize}
                  fontWeight={theme.typography.h8.fontWeight}
                  color="hsl(0deg 0% 6% / 54%)"
                >
                  {selectedCategory === "nowShowing"
                    ? `Oops! No movies are currently playing in ${cityDetails?.cityName}`
                    : `Oops! No upcoming movies are scheduled to be released in ${cityDetails?.cityName}`}
                </Typography>
                <Typography
                  fontSize={theme.typography.h9.fontSize}
                  fontWeight={theme.typography.h9.fontWeight}
                  color="hsl(0deg 0% 6% / 54%)"
                  sx={{ mt: 1 }}
                >
                  {selectedCategory === "nowShowing"
                    ? `But don’t worry, exciting movies are coming soon!`
                    : `Checkout the currently playing movies!`}
                </Typography>

                {/* Action Button */}
                <Button
                  label={
                    selectedCategory === "nowShowing"
                      ? "Check Upcoming Movies"
                      : "Check Running Movies"
                  }
                  onClick={() => {
                    selectedCategory === "nowShowing"
                      ? setSelectedCategory("comingSoon")
                      : setSelectedCategory("nowShowing");
                  }}
                  style={{
                    marginTop: "1rem",
                    padding: "10px 20px",
                    fontSize: "1rem",
                  }}
                />
              </Box>
            </motion.div>
          ) : (
            <>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent={"flex-start"}
                gap="0.5rem"
              >
                <Typography
                  fontSize={theme.typography.h5.fontSize}
                  fontWeight={theme.typography.h4.fontWeight}
                >
                  {selectedCategory === "nowShowing"
                    ? `Movies in ${cityDetails?.cityName}`
                    : `Upcoming Movies in ${cityDetails?.cityName}`}
                </Typography>
                <Box display="flex" flexWrap="wrap" gap="0.5rem">
                  {listAllLanguages.map((language) => (
                    <Button
                      key={language}
                      label={language}
                      variant="tertiaryv3"
                      sx={{
                        borderRadius: "16px",
                        backgroundColor: selectedLanguages.includes(language)
                          ? theme.palette.primary.main
                          : "white",
                        color: selectedLanguages.includes(language)
                          ? theme.palette.getContrastText(
                              theme.palette.primary.main
                            )
                          : "#000",
                        border: selectedLanguages.includes(language)
                          ? "1px solid #1976d2"
                          : "1px solid #ccc",
                        transition: "all 0.3s ease-in-out",
                      }}
                      onClick={() => handleLanguageSelection(language)}
                    />
                  ))}
                </Box>
              </Box>

              {/* Movie Cards */}
              <Box
                display="flex"
                justifyContent="space-evenly"
                flexWrap="wrap"
                // mb={10}
              >
                {filteredMovies.map((movieObj) => (
                  <MovieCard
                    key={movieObj.id}
                    movieObj={movieObj}
                    selectedCategory={selectedCategory}
                  />
                ))}
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default UserHomePage;
