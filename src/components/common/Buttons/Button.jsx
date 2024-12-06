import { useTheme } from "@mui/material/styles";
import { StyledButton } from "./Button.style";

const Button = (props) => {
  const theme = useTheme();

  // Common styles for all button variants
  const combinedStyles = {
    color: theme.palette.text.primary, // Text color from theme
    borderRadius: "4px", // Border radius from theme
    textTransform: "none", // Ensure no text transformation
    boxShadow: theme.shadows[2], // Light shadow from theme
    minWidth: "120px", // Minimum width for consistency
    paddingInline: props.paddingAdjust || theme.spacing(2), // Default padding from theme or custom padding
    ...props.style, // Any additional styles passed through props
  };

  // Define styles for each button variant
  const variantStyles = {
    primary: {
      variant: "contained",
      backgroundColor: theme.palette.primary.main, // Primary color from theme
      color: theme.palette.getContrastText(theme.palette.primary.main), // Ensure contrast for text
      "&:hover": {
        backgroundColor: theme.palette.primary.dark, // Darker shade on hover
        boxShadow: theme.shadows[4], // Darker shadow on hover
      },
    },
    secondary: {
      variant: "contained",
      backgroundColor: theme.palette.secondary.main, // Secondary color from theme
      color: theme.palette.getContrastText(theme.palette.secondary.main),
      "&:hover": {
        backgroundColor: theme.palette.secondary.dark, // Darker shade on hover
        boxShadow: theme.shadows[4], // Darker shadow on hover
      },
    },
    tertiary: {
      variant: "outlined",
      color: theme.palette.secondary.main,
      border: `1px solid ${theme.palette.borderColor.main}`, // Custom border color
      backgroundColor: theme.palette.background.paper, // Paper background
      "&:hover": {
        backgroundColor: theme.palette.secondary.light, // Light shade on hover
        borderColor: theme.palette.secondary.dark, // Darker border on hover
      },
    },
    text: {
      variant: "text",
      color: theme.palette.text.primary, // Primary text color from theme
      backgroundColor: theme.palette.highlightColor.main, // Highlight background color
      borderColor: theme.palette.borderColor.main, // Border color from theme
      borderRadius: "0px", // No border radius for text button
      paddingInline: theme.spacing(3), // Padding adjustment
      "&:hover": {
        backgroundColor: theme.palette.highlightColor.light, // Lighter shade on hover
      },
    },
    tertiaryv2: {
      variant: "outlined",
      color: "#B30753", // Custom color for tertiaryv2 button
      backgroundColor: "#FFEFF6", // Custom background
      border: `1px solid #ffddec`, // Custom border
      "&:hover": {
        backgroundColor: "#F5E1F5", // Light pink on hover
        borderColor: "#FFD6EC", // Lighter border color on hover
      },
    },
  };

  const buttonVariant = variantStyles[props.variant] || variantStyles.primary; // Default to "primary"

  return (
    <StyledButton
      variant={buttonVariant.variant}
      color={buttonVariant.color}
      disabled={props.disabled}
      sx={{ ...combinedStyles, ...buttonVariant }} // Apply combined styles and variant-specific styles
      onClick={props.onClick}
    >
      {props.label}
    </StyledButton>
  );
};

export default Button;
