import { useForm } from "react-hook-form";
import FormBuilder from "../../../components/common/Forms/FormBuilder";
import { Box, Typography } from "@mui/material";
import { useCallback } from "react";
import Button from "../../../components/common/buttons/Button";
import { useTheme } from "@emotion/react";
import { AdminRegisterFormFields } from "./AdminRegister.formfields";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAppEvents } from "../../../app/hooks/AppEventProvider";
import { useMutation } from "@tanstack/react-query";
import { setIsPageLoading } from "../../../app/reducers/globalAlertSlice";
import { post } from "../../../app/api/apiConfig";

const AdminRegister = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    mode: "all",
  });

  const dispatch = useDispatch();
  const { alertNotification } = useAppEvents();
  const navigate = useNavigate();
  const theme = useTheme();

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data) => {
      try {
        const response = await post({ url: "/admin/register", data });

        if (response.status >= 400) {
          throw response.data;
        }

        return response.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (data) => {
      alertNotification({ message: data.message, severity: "success" });
      reset();
      navigate("/admin/login");
    },
    onError: (error) => {
      alertNotification({ message: error.message, severity: "error" });
    },
    onMutate: () => {
      dispatch(setIsPageLoading(true));
    },
    onSettled: () => {
      dispatch(setIsPageLoading(false));
    },
  });

  const onSubmit = useCallback(async (data) => {
    mutate(data);
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
              formFields={() => AdminRegisterFormFields()}
              control={control}
              errors={errors}
              gridColumns={12}
              direction={"column"}
            />
          </Box>
          <Box display={"flex"} justifyContent={"center"}>
            <Button
              type="submit"
              label="Register"
              variant="primary"
              disabled={isLoading}
            />
          </Box>
        </Box>
      </form>
      <Typography color={theme.palette.text.secondary}>
        Already an Admin? <Link to={"/admin/login"}>Login</Link>
      </Typography>
    </Box>
  );
};

export default AdminRegister;
