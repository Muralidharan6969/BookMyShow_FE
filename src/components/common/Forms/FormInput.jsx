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
  console.log("label", label);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => (
        <FormControl fullWidth>
          <Box
            display={"flex"}
            alignItems={"center"}
            padding={"10px 10px"}
            // justifyContent={"space-between"}
            // gap={"2rem"}
          >
            <Box width={"25%"} textAlign={"left"}>
              {label && (
                <FormLabel
                  sx={{
                    fontSize: theme.typography.body2.fontSize,
                    color: theme.palette.primary.main,
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
            </Box>

            <Box
              display={"flex"}
              flexDirection={"column"}
              gap={"0.2rem"}
              width={"75%"}
            >
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
                    borderRadius: "6px !important",
                    backgroundColor: disabled ? "#f0f0f0" : "inherit",
                    "&:hover": {
                      cursor: disabled ? "not-allowed" : "inherit",
                    },
                    height: "2.5rem",
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
          </Box>
        </FormControl>
      )}
    />
  );
};

export default FormInput;
