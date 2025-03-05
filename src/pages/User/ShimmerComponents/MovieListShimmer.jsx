import { Box, Skeleton } from "@mui/material";

const MovieListShimmer = () => {
  return (
    <Box
      width="85%"
      padding="1rem"
      sx={{
        background: "white",
        borderRadius: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      {/* Language Filters */}
      <Box display="flex" gap="0.5rem">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} variant="rounded" width={80} height={30} />
        ))}
      </Box>

      {/* Movie Cards */}
      <Box display="flex" justifyContent="space-evenly" flexWrap="wrap">
        {[...Array(4)].map((_, i) => (
          <Skeleton
            key={i}
            variant="rounded"
            width={250}
            height={379}
            sx={{
              marginBottom: "1rem",
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default MovieListShimmer;
