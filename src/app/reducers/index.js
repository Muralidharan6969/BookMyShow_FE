import { combineReducers } from "redux";
import globalReducer from "./globalAlertSlice";
import userReducer from "./userSlice";

export const rootReducer = combineReducers({
  globalReducer,
  userReducer,
});
