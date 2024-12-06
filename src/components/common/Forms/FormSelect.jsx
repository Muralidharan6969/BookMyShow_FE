import { ErrorMessage } from "@hookform/error-message";
import { FormControl, FormLabel, useTheme } from "@mui/material";
import { Controller } from "react-hook-form";
import Select from "react-select";

const FormSelect = ({
  name,
  control,
  rules = {},
  label,
  errors,
  options = [],
  disabled = false,
  placeholder = "Select an option",
  handleSelectInputChange,
}) => {
  const theme = useTheme();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value } }) => (
        <FormControl fullWidth>
          {label && (
            <FormLabel
              sx={{
                fontSize: theme.typography.body2.fontSize,
                fontWeight: theme.typography.h6.fontWeight,
                color: theme.palette.secondary.main,
                mb: 1,
              }}
            >
              {label}
              {rules.required && (
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
          <Select
            value={options.find((option) => option.value === value) || null}
            onInputChange={handleSelectInputChange}
            onChange={(newValue) => onChange(newValue?.value || null)}
            options={options}
            isDisabled={disabled}
            placeholder={placeholder}
            styles={{
              control: (base, state) => ({
                ...base,
                fontSize: theme.typography.body2.fontSize,
                borderRadius: "8px",
                minHeight: "36px",
                borderColor: state.isFocused
                  ? theme.palette.primary.main
                  : "#D5D6D6",
                ":hover": {
                  borderColor: state.isFocused
                    ? theme.palette.primary.main
                    : "#D5D6D6",
                },
              }),
              option: (base, state) => ({
                ...base,
                fontWeight: state.isFocused ? 600 : 500,
                fontSize: theme.typography.body2.fontSize,
                color: state.isFocused
                  ? theme.palette.primary.main
                  : theme.palette.text.primary,
                backgroundColor: state.isFocused
                  ? theme.palette.highlightColor.main
                  : base.backgroundColor,
                ":hover": {
                  backgroundColor: theme.palette.highlightColor.main,
                },
              }),
              menu: (base) => ({
                ...base,
                backgroundColor: theme.palette.background.paper,
                zIndex: 100,
              }),
              input: (base) => ({
                ...base,
              }),
              indicatorSeparator: () => ({ display: "none" }),
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
        </FormControl>
      )}
    />
  );
};

export default FormSelect;
