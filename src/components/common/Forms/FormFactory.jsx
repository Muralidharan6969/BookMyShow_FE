import FormDatePicker from "./FormDatePicker";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";

const FormFactory = (props) => {
  const renderFormElements = (props) => {
    switch (props.type) {
      case "textfield":
        return (
          <FormInput
            {...props}
            control={props.control}
            errors={props.errors}
            rules={props.rules}
          />
        );
      case "select":
        return (
          <FormSelect
            {...props}
            control={props.control}
            errors={props.errors}
            rules={props.rules}
          />
        );
      case "datepicker":
        return (
          <FormDatePicker
            {...props}
            control={props.control}
            errors={props.errors}
            rules={props.rules}
          />
        );
    }
  };

  return <>{renderFormElements(props)}</>;
};

export default FormFactory;
