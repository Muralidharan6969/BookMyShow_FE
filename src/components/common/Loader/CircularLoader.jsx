import { CircularProgress, useTheme } from "@mui/material";
import { styled } from "@mui/system";

const ProgressContainer = styled("div")({
  position: "fixed",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  backgroundColor: "rgba(0, 0, 0, 0.3)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
});

const Wrapper = styled("div")({
  width: "100px",
  height: "100px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  bgcolor: "red",
});

export const CircularLoader = () => {
  const theme = useTheme();
  return (
    <ProgressContainer>
      <CircularProgress
        size={60}
        thickness={3}
        sx={{ color: theme.palette.primary.main }}
      />
    </ProgressContainer>
  );
};

export default CircularLoader;
