import { createContext, useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CircularLoader from "../../components/common/loader/CircularLoader";
import { clearAlerts } from "../reducers/globalAlertSlice";
import { Alert, keyframes, Snackbar } from "@mui/material";

const AppEventContext = createContext();

export const useAppEvents = () => {
  return useContext(AppEventContext);
};

export const AppEventProvider = ({ children }) => {
  const [open, setOpen] = useState(true);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
    dispatch(clearAlerts());
  };

  const isPageLoading = useSelector(
    (state) => state.globalReducer.isPageLoading
  );

  const alertNotification = ({ message, severity }) => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  const slideInRightToLeft = keyframes`
  0% {
    transform: translateX(100%); 
  }
  100% {
    transform: translateX(0); 
  }`;

  return (
    <AppEventContext.Provider value={{ alertNotification }}>
      {message && (
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          sx={{
            animation: `${slideInRightToLeft} 0.2s ease-out`,
          }}
        >
          <Alert
            onClose={handleClose}
            severity={severity}
            sx={{
              fontSize: "16px",
              fontWeight: "bold",
              textAlign: "center",
              alignItems: "center",
              display: "flex",
              borderLeft: "3px solid",
            }}
          >
            {message}
          </Alert>
        </Snackbar>
      )}
      {isPageLoading && <CircularLoader />}
      {children}
    </AppEventContext.Provider>
  );
};
