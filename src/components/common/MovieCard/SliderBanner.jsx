import React, { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const NextArrow = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: "absolute",
      top: "50%",
      right: "30px", // Move outside container slightly
      transform: "translateY(-50%)",
      zIndex: 2,
      backgroundColor: "rgba(0,0,0,0.5)",
      color: "white",
      "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
    }}
  >
    <ArrowForwardIos />
  </IconButton>
);

const PrevArrow = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: "absolute",
      top: "50%",
      left: "30px", // Move outside container slightly
      transform: "translateY(-50%)",
      zIndex: 2,
      backgroundColor: "rgba(0,0,0,0.5)",
      color: "white",
      "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
    }}
  >
    <ArrowBackIos />
  </IconButton>
);

const SliderBanner = ({ moviesArray }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef(null);
  const isSingleSlide = moviesArray.length === 1;

  console.log("isSingleSlide", isSingleSlide);

  const settings = {
    dots: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    centerMode: true, // Enable visibility of prev/next slides
    centerPadding: "20%", // Increase padding to reveal parts of next/prev slides
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    afterChange: (current) => setActiveIndex(current),
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "18rem", // Slightly increase height
        // marginTop: 3,
        borderRadius: 2,
        padding: "1rem",
        overflow: "hidden",
        position: "relative",
        // display: "flex",
        // justifyContent: "center",
        // alignItems: "center",
        "& .slick-dots": {
          bottom: "10px",
        },
        "& .slick-dots li button:before": {
          color: "white",
          fontSize: "12px",
        },
      }}
    >
      <Slider ref={sliderRef} {...settings}>
        {moviesArray.map((movieObj, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "transform 0.5s ease-in-out",
              transform: index === activeIndex ? "scale(0.98)" : "scale(0.98)", // Scale inactive slides
              opacity: index === activeIndex ? 1 : 0.7, // Reduce opacity for inactive slides
            }}
          >
            <img
              src={movieObj.backgroundImageURL}
              alt={`Slide ${index + 1}`}
              style={{
                width: "85vw", // Adjust width to fit within padding
                height: "100%",
                borderRadius: "10px",
                objectFit: "cover",
                maxHeight: "18rem",
                maxWidth: "100%",
                boxShadow:
                  index === activeIndex
                    ? "0px 4px 15px rgba(0, 0, 0, 0)"
                    : "none",
                transition: "all 0.3s ease-in-out",
              }}
            />
          </Box>
        ))}
      </Slider>
      {/* {!isSingleSlide && (
        <>
          <PrevArrow onClick={() => sliderRef?.current?.slickPrev()} />
          <NextArrow onClick={() => sliderRef?.current?.slickNext()} />
        </>
      )} */}
    </Box>
  );
};

export default SliderBanner;
