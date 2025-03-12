import { Box, Skeleton } from "@mui/material";
import React from "react";

const MovieDetailSkeleton = () => {
  return (
    <Box
      sx={{
        borderBottom: "1px solid #d0d5e6",
        boxSizing: "border-box",
      }}
      display={"flex"}
      justifyContent={"center"}
    >
      <Box
        p={"20px 0px"}
        width={"85%"}
        display={"flex"}
        justifyContent={"flex-start"}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          gap={"0.875rem"}
          width={"60%"}
        >
          <Skeleton variant="text" width="60%" height={40} />
          <Skeleton variant="text" width="40%" height={20} />
          <Box display="flex" gap="5px">
            <Skeleton
              variant="rectangular"
              width={50}
              height={20}
              sx={{ borderRadius: "11px" }}
            />
            <Skeleton
              variant="rectangular"
              width={50}
              height={20}
              sx={{ borderRadius: "11px" }}
            />
            <Skeleton
              variant="rectangular"
              width={50}
              height={20}
              sx={{ borderRadius: "11px" }}
            />
          </Box>
          <Skeleton variant="text" width="30%" height={20} />
        </Box>

        <Box display={"flex"} justifyContent={"flex-end"} width={"40%"}>
          <Skeleton
            variant="rectangular"
            width={158}
            height={208}
            sx={{ borderRadius: "8px" }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default MovieDetailSkeleton;
