import {
  Box,
  FormControl,
  FormLabel,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

const CustomInput = ({
  name,
  label,
  disabled = false,
  placeholder,
  value,
  rules = {},
  onChange,
  width,
}) => {
  const theme = useTheme();

  return (
    <FormControl fullWidth disabled={disabled}>
      <Box display={"flex"} alignItems={"center"} gap={"1rem"}>
        <FormLabel
          sx={{
            fontSize: theme.typography.body2.fontSize,
            color: theme.palette.primary.main,
            fontWeight: theme.typography.h6.fontWeight,
            mb: 1,
            "&.Mui-focused": {
              color: theme.palette.secondary.main,
            },
          }}
        >
          {label}
          {rules?.required && (
            <span
              style={{
                color: theme.palette.error.main,
                paddingLeft: "3px",
              }}
            >
              {" "}
              *
            </span>
          )}
        </FormLabel>
        <TextField
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px !important",
              backgroundColor: disabled ? "#f0f0f0" : "inherit",
              "&:hover": {
                cursor: disabled ? "not-allowed" : "inherit",
              },
              height: "3rem",
              width: width,
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: disabled ? "1px solid  #D5D6D690" : "1px solid #D5D6D6",
            },
            "& .MuiInputBase-input.Mui-disabled": {
              color: theme.palette.secondary.main,
            },
          }}
        />
      </Box>
    </FormControl>
  );
};

export default CustomInput;
