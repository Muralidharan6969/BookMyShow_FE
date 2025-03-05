import { Grid2 } from "@mui/material";
import FormFactory from "./FormFactory";

const FormBuilder = (props) => {
  const formFields = props.formFields().filter((field) => field.hide !== true);

  return (
    <Grid2 container spacing={2} direction={props.direction || "row"}>
      {formFields.map((field, index) => {
        return (
          <Grid2
            item
            xs={field?.gridColumns || props.gridColumns || 12}
            key={index}
          >
            <FormFactory
              {...field}
              control={props.control}
              errors={props.errors}
              rules={field?.rules}
            />
          </Grid2>
        );
      })}
    </Grid2>
  );
};

export default FormBuilder;
