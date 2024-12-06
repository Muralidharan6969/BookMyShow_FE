import { ErrorMessage } from "@hookform/error-message";
import { Box, FormControl, FormLabel, useTheme } from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import moment from "moment";
import { Controller } from "react-hook-form";

const FormDatePicker = ({
  name,
  control,
  rules,
  label,
  errors,
  defaultValue,
  style,
  disabled = false,
  dateOnly = false, // Default to false if not provided
}) => {
  const theme = useTheme();

  //   const formControlStyle = {
  //     display: "flex",
  //     flexDirection: "row",
  //   };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue ? moment(defaultValue) : null}
      render={({ field: { onChange, value } }) => {
        return (
          <FormControl fullWidth>
            <FormLabel
              sx={{
                fontSize: theme.typography.body2.fontSize,
                color: theme.palette.secondary.main,
                fontWeight: theme.typography.h6.fontWeight,
                mb: 1,
                //   "&.Mui-focused": {
                //     color: theme.palette.secondary.main,
                //   },
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
                  value={
                    value !== undefined && value !== null ? moment(value) : null
                  }
                  onChange={(dateObject) => {
                    const formattedDate =
                      dateObject === null
                        ? null
                        : dateOnly
                        ? moment(dateObject).format("YYYY-MM-DD")
                        : dateObject?.toISOString();
                    onChange(formattedDate);
                  }}
                  // format={dateOnly ? "YYYY-MM-DD" : "DD-MM-YYYY"} // Adjust displayed format
                  format={
                    value !== undefined && value !== null ? "DD-MM-YYYY" : ""
                  }
                  sx={{
                    fontSize: theme.typography.body2.fontSize,
                    width: "100%",
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
              {errors && (
                <ErrorMessage
                  errors={errors}
                  name={name}
                  render={({ message }) => (
                    <Box
                      sx={{
                        fontSize: theme.typography.body2.fontSize,
                        color: theme.palette.error.main,
                      }}
                    >
                      {message}
                    </Box>
                  )}
                />
              )}
            </Box>
          </FormControl>
        );
      }}
    />
  );
};

export default FormDatePicker;
