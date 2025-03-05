export const OutletRegisterFormFields = () => {
  return [
    {
      name: "outletOwnershipName",
      label: "Outlet Ownership Name",
      type: "textfield",
      rules: {
        required: "Name is required",
      },
      hide: false,
      defaultValue: "",
      gridColumns: 12,
      placeholder: "Enter your Outlet Name",
    },
    {
      name: "email",
      label: "Email",
      type: "textfield",
      additionalType: "email",
      rules: {
        required: "Email is required",
      },
      hide: false,
      defaultValue: "",
      gridColumns: 12,
      placeholder: "Enter your Email",
    },
    {
      name: "mobileNumber",
      label: "Mobile",
      type: "textfield",
      additionalType: "tel", // Set input type to 'tel' for mobile number
      inputMode: "numeric", // Hint to show numeric keyboard on mobile devices
      rules: {
        required: "Mobile Number is required",
        pattern: {
          value: /^[0-9]{10}$/, // Regex to allow only 10 digits (adjust as needed)
          message: "Mobile number must be exactly 10 digits",
        },
      },
      hide: false,
      defaultValue: "",
      gridColumns: 12,
      placeholder: "Enter your Mobile Number",
    },
    {
      name: "password",
      label: "Password",
      type: "textfield",
      additionalType: "password",
      rules: {
        required: "Password is required",
      },
      hide: false,
      defaultValue: "",
      gridColumns: 12,
      placeholder: "Enter your Password",
    },
  ];
};
