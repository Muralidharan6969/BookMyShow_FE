import { useForm } from "react-hook-form";
import FormBuilder from "../../../components/common/Forms/FormBuilder";
import { Box, Typography } from "@mui/material";
import { useCallback } from "react";
import { UserRegisterFormFields } from "./UserRegister.formfields";
import Button from "../../../components/common/buttons/Button";
import { useTheme } from "@emotion/react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useAppEvents } from "../../../app/hooks/AppEventProvider";
import { post } from "../../../app/api/apiConfig";
import { setIsPageLoading } from "../../../app/reducers/globalAlertSlice";
import { useDispatch } from "react-redux";
import AuthWrapper from "../Layout/AuthWrapper";

const UserRegister = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    mode: "all",
  });
  const dispatch = useDispatch();
  const theme = useTheme();
  const { alertNotification } = useAppEvents();
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data) => {
      try {
        const response = await post({ url: "/users/signup", data });

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
      navigate("/user/login");
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
    <AuthWrapper
      title="Create Your Account"
      description="Join us today and book your favorite movies hassle-free!"
      link="/user/login"
      linkText="Already a user? Login"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" flexDirection="column" gap="1rem">
          <Box width="30vw">
            <FormBuilder
              formFields={() => UserRegisterFormFields()}
              control={control}
              errors={errors}
              gridColumns={12}
              direction="column"
            />
          </Box>
          <Box display="flex" justifyContent="center">
            <Button
              type="submit"
              label="Register"
              variant="primary"
              disabled={isLoading}
            />
          </Box>
        </Box>
      </form>
    </AuthWrapper>
  );
};

export default UserRegister;
