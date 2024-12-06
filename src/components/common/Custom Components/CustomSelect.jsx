import { Box, FormControl, FormLabel, useTheme } from "@mui/material";
import Select from "react-select";

const CustomSelect = ({
  name,
  label,
  value,
  onChange,
  onInputChange,
  placeholder = "Select an Option",
  options = [],
  disabled = false,
  rules,
}) => {
  const theme = useTheme();

  return (
    <FormControl fullWidth>
      <Box display="flex" alignItems={"center"} gap={"1rem"}>
        <FormLabel
          sx={{
            fontSize: theme.typography.body2.fontSize,
            fontWeight: theme.typography.h6.fontWeight,
            color: theme.palette.primary.main,
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
        <Select
          isSearchable
          value={options.find((option) => option.value === value) || null}
          onChange={(newValue) => {
            if (onChange) {
              onChange(newValue ? newValue.value : null);
            }
          }}
          onInputChange={(inputValue, actionMeta) => {
            if (onInputChange) {
              onInputChange(inputValue, actionMeta);
            }
          }}
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
      </Box>
    </FormControl>
  );
};

export default CustomSelect;
