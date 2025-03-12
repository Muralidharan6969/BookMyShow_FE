import { Box, Skeleton } from "@mui/material";
import React from "react";

const TheatreShowDetailsSkeleton = () => {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      p={"20px 0px"}
      sx={{ minHeight: "1000px", background: "#f2f2f2" }}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"flex-start"}
        minHeight={"650px"}
        width={"85%"}
        sx={{ background: "white" }}
      >
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
            padding={"5px"}
          >
            <Skeleton variant="circular" width={16} height={16} />
            <Skeleton variant="text" width={80} height={20} />
          </Box>
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={"10px"}
            padding={"5px"}
          >
            <Skeleton variant="circular" width={16} height={16} />
            <Skeleton variant="text" width={100} height={20} />
          </Box>
        </Box>

        {[...Array(3)].map((_, index) => (
          <Box
            key={index}
            display="flex"
            flexDirection="column"
            width="100%"
            padding="20px"
            borderBottom="1px solid #f2f2f2"
          >
            <Skeleton variant="text" width="30%" height={30} />
            <Skeleton variant="text" width="20%" height={20} />
            <Box display="flex" gap="10px" mt="10px">
              <Skeleton
                variant="rectangular"
                width={80}
                height={30}
                sx={{ borderRadius: "4px" }}
              />
              <Skeleton
                variant="rectangular"
                width={80}
                height={30}
                sx={{ borderRadius: "4px" }}
              />
              <Skeleton
                variant="rectangular"
                width={80}
                height={30}
                sx={{ borderRadius: "4px" }}
              />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TheatreShowDetailsSkeleton;
