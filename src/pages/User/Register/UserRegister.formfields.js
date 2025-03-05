export const UserRegisterFormFields = () => {
  return [
    {
      name: "name",
      label: "Name",
      type: "textfield",
      rules: {
        required: "Name is required",
      },
      hide: false,
      defaultValue: "",
      gridColumns: 12,
      placeholder: "Enter your Name",
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
