import { Grid2 } from "@mui/material";
import FormFactory from "./FormFactory";

const FormBuilder = (props) => {
  const formFields = props.formFields().filter((field) => field.hide !== true);

  return (
    <Grid2 container spacing={2}>
      {formFields.map((field, index) => {
        return (
          <Grid2
            item
            xs={field?.gridColumns || props.gridColumns || 6}
            key={index}
          >
            <FormFactory
              {...field}
              control={props.control}
              errors={props.errors}
              rules={props.rules}
            />
          </Grid2>
        );
      })}
    </Grid2>
  );
};

export default FormBuilder;
