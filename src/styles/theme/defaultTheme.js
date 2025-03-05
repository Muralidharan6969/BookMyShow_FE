import { createTheme } from "@mui/material/styles";

export const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#185FB3",
    },
    secondary: {
      main: "#D1E7FF",
    },
    background: {
      default: "#ECF2F8",
      paper: "#FFFFFF",
    },
    customBackground: {
      customBox: "#e7f1f8",
    },
    text: {
      primary: "#333333",
      secondary: "#757575",
    },
    accent: {
      main: "#FF9F00",
    },
    highlightColor: {
      main: "#E3F2FD",
    },
    borderColor: {
      main: "#D1E7FF",
    },
    error: {
      main: "#FF0000",
      light: "#F08080",
    },
  },
  typography: {
    fontFamily: ' "Helvetica"',
    h1: { fontWeight: 500, fontSize: "2.25rem", letterSpacing: "-0.5px" },
    h2: { fontWeight: 500, fontSize: "2rem" },
    h3: { fontWeight: 400, fontSize: "1.75rem" },
    h4: { fontWeight: 400, fontSize: "1.5rem" },
    h5: { fontWeight: 400, fontSize: "1.25rem" },
    h6: { fontWeight: 400, fontSize: "1rem" },
    h7: { fontWeight: 500, fontSize: "1.15rem" },
    h8: { fontWeight: 400, fontSize: "1.15rem" },
    h9: { fontWeight: 300, fontSize: "1rem" },
    body1: { fontWeight: 400, fontSize: "1rem" },
    body2: { fontWeight: 400, fontSize: "0.875rem" },
    body3: { fontWeight: 400, fontSize: "0.7rem" },
    body4: { fontWeight: 600, fontSize: "0.875rem" },
  },
  overrides: {
    MuiButton: {
      root: { borderRadius: 4 },
    },
    MuiPaper: {
      root: { boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)" },
    },
  },
});
