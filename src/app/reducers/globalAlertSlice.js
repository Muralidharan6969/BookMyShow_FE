import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSuccess: false,
  isError: false,
  errorMessage: "",
  successMessage: "",
  isPageLoading: false,
};

export const globalAlertSlice = createSlice({
  name: "globalAlertSlice",
  initialState: initialState,
  reducers: {
    setSuccess(state, action) {
      state.isSuccess = action.payload.status;
      state.successMessage = action.payload.message;
    },
    setError(state, action) {
      state.isError = action.payload.status;
      state.errorMessage = action.payload.message;
    },
    setIsPageLoading(state, action) {
      state.isPageLoading = action.payload;
    },
    clearAlerts(state) {
      return {
        ...state,
        ...initialState,
      };
    },
  },
});

export const { setSuccess, setError, clearAlerts, setIsPageLoading } =
  globalAlertSlice.actions;

export default globalAlertSlice.reducer;
