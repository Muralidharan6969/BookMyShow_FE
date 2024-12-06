import { Box, FormControl, FormLabel, useTheme } from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import moment from "moment";

const CustomDatePicker = ({
  label,
  defaultValue,
  disabled,
  placeholder = "Enter Date",
  rules = {},
  dateOnly = false,
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
        <Box>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              disabled={disabled}
              value={defaultValue ? moment(defaultValue) : null}
              onChange={(dateObject) => {
                const formattedDate =
                  dateObject === null
                    ? null
                    : dateOnly
                    ? moment(dateObject).format("YYYY-MM-DD")
                    : moment(dateObject).startOf("day").toISOString();
                console.log("formattedDate", formattedDate);
                // onChange(formattedDate);
              }}
              // format={dateOnly ? "YYYY-MM-DD" : "DD-MM-YYYY"} // Adjust displayed format
              format={defaultValue ? "DD-MM-YYYY" : ""}
              slotProps={{
                textField: {
                  placeholder: placeholder, // Your placeholder text here
                },
              }}
              sx={{
                fontSize: theme.typography.body2.fontSize,
                color: theme.palette.secondary.main,
                "& .MuiInputBase-input": {
                  padding: "8px 10px",
                  fontSize: theme.typography.body2.fontSize,
                  color: "#000000",
                  borderRadius: "8px !important",
                },
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "1px solid #D5D6D6 !important",
                },
                "&:focus.MuiOutlinedInput-notchedOutline": {
                  border: `1px solid ${theme.palette.primary.main}`,
                },
                "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                  border: `2px solid ${theme.palette.primary.main} !important`,
                },
                "& .MuiOutlinedInput-input": {
                  borderColor: theme.palette.secondary.main,
                },
              }}
            />
          </LocalizationProvider>
        </Box>
      </Box>
    </FormControl>
  );
};

export default CustomDatePicker;
