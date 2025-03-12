import { useForm } from "react-hook-form";
import FormBuilder from "../../../components/common/Forms/FormBuilder";
import { Box, Typography } from "@mui/material";
import { useCallback } from "react";
import Button from "../../../components/common/buttons/Button";
import { useTheme } from "@emotion/react";
import { UserLoginFormFields } from "./UserLogin.formfields";
import { Link, useNavigate } from "react-router-dom";
import { useAppEvents } from "../../../app/hooks/AppEventProvider";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { setIsPageLoading } from "../../../app/reducers/globalAlertSlice";
import { post } from "../../../app/api/apiConfig";
import { setUserDetails } from "../../../app/reducers/userSlice";
import AuthWrapper from "../Layout/AuthWrapper";

const UserLogin = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    mode: "all",
  });

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userReducer.userDetails);
  const theme = useTheme();
  const { alertNotification } = useAppEvents();
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data) => {
      try {
        const response = await post({ url: "/users/login", data });

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
      const { token, ...userData } = data;
      sessionStorage.setItem("bms-auth-token", token);
      sessionStorage.setItem("userType", "user");
      dispatch(setUserDetails(userData));
      navigate("/user/home");
    },
    onError: (error) => {
      alertNotification({
        message: error.message,
        severity: "error",
      });
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
    <AuthWrapper
      title="Welcome Back!"
      description="Your next movie experience is just a click away! Log in to book tickets, explore showtimes, and enjoy exclusive deals."
      link="/user/register"
      linkText="New user? Register Here"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" flexDirection="column" gap="1rem">
          <Box width="30vw">
            <FormBuilder
              formFields={() => UserLoginFormFields()}
              control={control}
              errors={errors}
              gridColumns={12}
              direction="column"
            />
          </Box>
          <Box display="flex" justifyContent="center">
            <Button type="submit" label="Login" variant="primary" />
          </Box>
        </Box>
      </form>
    </AuthWrapper>
  );
};

export default UserLogin;
