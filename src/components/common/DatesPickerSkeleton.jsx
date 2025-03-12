import { Box, Skeleton } from "@mui/material";
import React from "react";

const DatesPickerSkeleton = () => {
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      p={"20px 20px"}
      sx={{ background: "#f2f2f2" }}
      borderBottom={"1px solid #d0d5e6"}
      position={"sticky"}
      top={"82px"}
      zIndex={50}
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
        <Box sx={{ width: "30%" }}>
          <Skeleton variant="rectangular" width="100%" height={40} />
        </Box>

        <Box
          sx={{
            width: "30%",
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <Skeleton variant="text" width={60} height={20} />
          <Skeleton
            variant="rectangular"
            width={100}
            height={40}
            sx={{ borderRadius: "4px" }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default DatesPickerSkeleton;
