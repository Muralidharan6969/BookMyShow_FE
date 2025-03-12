import { useForm } from "react-hook-form";
import FormBuilder from "../../../components/common/Forms/FormBuilder";
import { Box, Typography } from "@mui/material";
import { useCallback } from "react";
import Button from "../../../components/common/buttons/Button";
import { useTheme } from "@emotion/react";
import { OutletLoginFormFields } from "./OutletLogin.formfields";
import { Link } from "react-router-dom";

const OutletLogin = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    mode: "all",
  });

  const theme = useTheme();

  const onSubmit = useCallback(async (data) => {
  }, []);

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      height="100vh"
      gap={"0.875rem"}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display={"flex"} flexDirection={"column"} gap={"1rem"}>
          <Box width={"25vw"}>
            <FormBuilder
              formFields={() => OutletLoginFormFields()}
              control={control}
              errors={errors}
              gridColumns={12}
              direction={"column"}
            />
          </Box>
          <Box display={"flex"} justifyContent={"center"}>
            <Button type="submit" label="Login" variant="primary" />
          </Box>
        </Box>
      </form>
      <Typography color={theme.palette.text.secondary}>
        New Outlet?{" "}
        <Link to={"/outlet/register"}>Register your Outlet here</Link>
      </Typography>
    </Box>
  );
};

export default OutletLogin;
