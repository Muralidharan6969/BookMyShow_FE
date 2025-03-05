import { useForm } from "react-hook-form";
import FormBuilder from "../../../components/common/Forms/FormBuilder";
import { Box, Typography } from "@mui/material";
import { useCallback } from "react";
import Button from "../../../components/common/buttons/Button";
import { useTheme } from "@emotion/react";
import { AdminLoginFormFields } from "./AdminLogin.formfields";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAppEvents } from "../../../app/hooks/AppEventProvider";
import { useMutation } from "@tanstack/react-query";
import { setIsPageLoading } from "../../../app/reducers/globalAlertSlice";
import { post } from "../../../app/api/apiConfig";

const AdminLogin = () => {
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
        const response = await post({ url: "/admin/login", data });

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
      sessionStorage.setItem("bms-auth-token", data.token);
      sessionStorage.setItem("userType", "admin");
      navigate("/admin/home");
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
    console.log("Submitted form data", data);
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
              formFields={() => AdminLoginFormFields()}
              control={control}
              errors={errors}
              gridColumns={12}
              direction={"column"}
            />
          </Box>
          <Box display={"flex"} justifyContent={"center"}>
            <Button
              type="submit"
              label="Login"
              variant="primary"
              disabled={isLoading}
            />
          </Box>
        </Box>
      </form>
      <Typography color={theme.palette.text.secondary}>
        New user? <Link to={"/admin/register"}>Register as Admin</Link>
      </Typography>
    </Box>
  );
};

export default AdminLogin;
