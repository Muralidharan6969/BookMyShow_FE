import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "../../pages/ErrorPage";

const logErrorToService = (error, info) => {
  console.error("Logged Error:", error);
  console.error("Component Stack:", info.componentStack);
};

const AppErrorBoundary = ({ children }) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorPage} onError={logErrorToService}>
      {children}
    </ErrorBoundary>
  );
};

export default AppErrorBoundary;
