import React, { useState } from "react";
import { Box, Popover, Typography, Slider, Button } from "@mui/material";
import { KeyboardArrowDown as ArrowDownIcon } from "@mui/icons-material";
import { useTheme } from "@emotion/react";

const ShowtimeFilter = ({ onFilterChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [timeRange, setTimeRange] = useState([0, 23.98]);
  const theme = useTheme();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTimeChange = (event, newValue) => {
    setTimeRange(newValue);
    if (onFilterChange) {
      onFilterChange(newValue);
    }
  };

  const formatTime = (value) => {
    let hours = Math.floor(value);
    const minutes = Math.round((value - hours) * 60);

    // Convert to 12-hour format
    let period = hours >= 12 ? "PM" : "AM";
    if (hours === 0) hours = 12;
    else if (hours > 12) hours -= 12;

    return `${hours}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  const open = Boolean(anchorEl);

  return (
    <Box>
      <Button
        onClick={handleClick}
        variant="outlined"
        endIcon={<ArrowDownIcon />}
        sx={{
          borderRadius: "8px",
          textTransform: "none",
          color: "hsl(0deg 0% 6% / 54%)",
          borderColor: "grey.300",
          background: "white",
          minWidth: "120px",
          justifyContent: "space-between",
          "& .MuiButton-endIcon": {
            ml: 1,
          },
        }}
        disableRipple
      >
        Showtime
      </Button>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{
          "& .MuiPopover-paper": {
            marginTop: 1,
            p: 3,
            width: 300,
          },
        }}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"flex-start"}
          gap={"0.5rem"}
        >
          <Typography variant="subtitle1" fontWeight="bold">
            Showtime
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {formatTime(timeRange[0])} - {formatTime(timeRange[1])}
          </Typography>
          <Box display={"flex"} justifyContent={"center"}>
            <Box width={"85%"}>
              <Slider
                value={timeRange}
                onChange={handleTimeChange}
                min={0}
                max={23.98} // Set to 23.98 to represent 11:59 PM
                step={0.5}
                marks={[
                  { value: 0, label: "12:00 AM" },
                  { value: 23.98, label: "11:59 PM" },
                ]}
                valueLabelDisplay="off"
                sx={{
                  "& .MuiSlider-markLabel": {
                    fontSize: theme.typography.body2.fontSize,
                    fontWeight: theme.typography.body2.fontWeight,
                    color: "grey",
                    left: "10%",
                  },
                }}
              />
            </Box>
          </Box>
        </Box>
      </Popover>
    </Box>
  );
};

export default ShowtimeFilter;
