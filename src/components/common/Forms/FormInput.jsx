import React from "react";
import { Box, FormControl, FormLabel, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { useTheme } from "@mui/material";
import { ErrorMessage } from "@hookform/error-message";

const FormInput = ({
  name,
  label,
  placeholder,
  defaultValue = "",
  rules = {},
  control,
  errors,
  additionalType,
  disabled = false,
}) => {
  const theme = useTheme();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => (
        <FormControl fullWidth>
          {label && (
            <FormLabel
              sx={{
                fontSize: theme.typography.body2.fontSize,
                color: theme.palette.secondary.main,
                fontWeight: theme.typography.h6.fontWeight,
                mb: 1,
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
          )}
          <Box>
            <TextField
              name={name}
              value={value}
              onChange={(e) => {
                onChange(e);
              }}
              disabled={disabled || false}
              type={additionalType}
              placeholder={placeholder}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px !important",
                  backgroundColor: disabled ? "#f0f0f0" : "inherit",
                  "&:hover": {
                    cursor: disabled ? "not-allowed" : "inherit",
                  },
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: disabled
                    ? "1px solid  #D5D6D690"
                    : "1px solid #D5D6D6",
                },
                "& .MuiInputBase-input.Mui-disabled": {
                  color: theme.palette.secondary.main,
                },
              }}
            />
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
      )}
    />
  );
};

export default FormInput;
