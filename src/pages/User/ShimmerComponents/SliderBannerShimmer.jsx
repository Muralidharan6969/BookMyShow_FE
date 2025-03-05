import { Box, Skeleton } from "@mui/material";

const SliderBannerShimmer = () => {
  return (
    <Box width="90%" height="200px">
      <Skeleton variant="rounded" width="100%" height="100%" />
    </Box>
  );
};

export default SliderBannerShimmer;
