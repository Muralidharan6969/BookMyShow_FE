export const AdminRegisterFormFields = () => {
    return [
      {
        name: "registrationId",
        label: "Admin Registration Id",
        type: "textfield",
        rules: {
          required: "Registration Id is required",
        },
        hide: false,
        defaultValue: "",
        gridColumns: 12,
        placeholder: "Enter your Registration Id",
      },
      {
        name: "mobileNumber",
        label: "Mobile",
        type: "textfield",
        rules: {
          required: "Mobile Number is required",
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
  