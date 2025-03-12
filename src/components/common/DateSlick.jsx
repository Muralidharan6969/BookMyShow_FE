import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import { Box, Typography, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import moment from "moment-timezone";
import { useTheme } from "@emotion/react";

const DateSlick = ({ showOnlyFutureDates, movieDates, dateSelection }) => {
  const theme = useTheme();
  const sliderRef = useRef(null);
  const [canGoNext, setCanGoNext] = useState(false);
  const [canGoPrev, setCanGoPrev] = useState(false);
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);

  // Filter dates based on current date
  const currentDateIST = moment().tz("Asia/Kolkata").format("YYYY-MM-DD");
  const filteredDates = showOnlyFutureDates
    ? movieDates.filter((dateObj) => dateObj.date >= currentDateIST)
    : movieDates;

  // Update arrow states based on slider position
  const updateArrowState = () => {
    if (!sliderRef.current) return;

    const slider = sliderRef.current.innerSlider;
    const currentSlide = slider.state.currentSlide;
    const totalSlides = slider.state.slideCount;
    const visibleSlides = Math.min(
      filteredDates.length,
      slider.props.slidesToShow
    );

    setCanGoPrev(currentSlide > 0);
    setCanGoNext(currentSlide < totalSlides - visibleSlides);
  };

  useEffect(() => {
    updateArrowState();
  }, [filteredDates]); // Update when dates change

  // Handle slide changes
  const handleAfterChange = () => {
    updateArrowState();
  };

  // Custom Next Arrow
  const NextArrow = ({ onClick }) => {
    console.log("Next Arrow Rendered");
    return (
      <IconButton
        onClick={onClick}
        disabled={!canGoNext}
        sx={{
          position: "absolute",
          right: "-10px",
          display: "block",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          color: canGoNext ? "black" : theme.palette.grey[400],
          opacity: 1,
          visibility: "visible !important",
          // backgroundColor: "white",
          // boxShadow: 2,
          "&:hover": {
            // backgroundColor: "white",
            color: canGoNext ? "black" : theme.palette.grey[400],
            cursor: canGoNext ? "pointer" : "default",
          },
        }}
        disableRipple
      >
        <ArrowForwardIosIcon fontSize="small" />
      </IconButton>
    );
  };

  // Custom Prev Arrow
  const PrevArrow = ({ onClick }) => {
    console.log("Prev Arrow Rendered");
    return (
      <IconButton
        onClick={onClick}
        disabled={!canGoPrev}
        sx={{
          position: "absolute",
          display: "block",
          // left: "-10px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          color: canGoPrev ? "black" : theme.palette.grey[400],
          opacity: 1,
          visibility: "visible !important",
          // backgroundColor: "white",
          // boxShadow: 2,
          "&:hover": {
            // backgroundColor: "white",
            color: canGoPrev ? "black" : theme.palette.grey[400],
            cursor: canGoPrev ? "pointer" : "default",
          },
        }}
        disableRipple
      >
        <ArrowBackIosIcon fontSize="small" />
      </IconButton>
    );
  };

  // Slider settings
  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: Math.min(filteredDates.length, 5),
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    afterChange: handleAfterChange,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(filteredDates.length, 4),
          afterChange: handleAfterChange,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(filteredDates.length, 3),
          afterChange: handleAfterChange,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: Math.min(filteredDates.length, 2),
          afterChange: handleAfterChange,
        },
      },
    ],
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        minWidth: "fit-content",
        "& .slick-list": {
          overflow: "hidden",
          marginLeft: "40px",
          marginRight: "40px",
        },
        "& .slick-track": {
          display: "flex",
          gap: "8px",
          justifyContent: "flex-start",
        },
      }}
    >
      <Slider ref={sliderRef} {...sliderSettings}>
        {filteredDates.map((dateObj, index) => (
          <Box
            key={index}
            sx={{
              textAlign: "center",
              cursor: "pointer",
              // p: 1,
              // backgroundColor: "white",
              "&:hover": { color: theme.palette.primary.main },
            }}
          >
            <Box
              display="flex"
              borderRadius="8px"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              marginRight={"5px"}
              p={"5px 10px"}
              sx={{
                cursor: "pointer",
                // "&:hover": {
                //   color: theme.palette.primary.main,
                //   transition: "0.3s",
                // },
                backgroundColor:
                  index === selectedDateIndex
                    ? theme.palette.primary.main
                    : "white", // Primary color from theme
                color:
                  index === selectedDateIndex
                    ? theme.palette.getContrastText(theme.palette.primary.main)
                    : "black",
                border: "1px solid hsla(0,0%,6%,.13)",
              }}
              onClick={() => {
                setSelectedDateIndex(index);
                dateSelection(dateObj);
              }}
            >
              <Typography
                fontSize={theme.typography.body3.fontSize}
                fontWeight={theme.typography.body3.fontWeight}
              >
                {dateObj.day}
              </Typography>
              <Typography
                fontSize={theme.typography.body4.fontSize}
                fontWeight={theme.typography.body4.fontWeight}
              >
                {dateObj.dayOfMonth}
              </Typography>
              <Typography
                fontSize={theme.typography.body3.fontSize}
                fontWeight={theme.typography.body3.fontWeight}
              >
                {dateObj.month}
              </Typography>
            </Box>
          </Box>
        ))}
      </Slider>
      <PrevArrow onClick={() => sliderRef?.current?.slickPrev()} />
      <NextArrow onClick={() => sliderRef?.current?.slickNext()} />
    </Box>
  );
};

export default DateSlick;
