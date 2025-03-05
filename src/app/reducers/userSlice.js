import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  city: null,
  userDetails: null,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState: initialState,
  reducers: {
    setPreferredCity(state, action) {
      state.city = action.payload;
    },
    setUserDetails(state, action) {
      state.userDetails = action.payload;
    },
  },
});

export const { setPreferredCity, setUserDetails } = userSlice.actions;

export default userSlice.reducer;
