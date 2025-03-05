export const OutletLoginFormFields = () => {
    return [
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
  