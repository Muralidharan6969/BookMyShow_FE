import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "@mui/material";
import { defaultTheme } from "./styles/theme/defaultTheme.js";
import { Provider } from "react-redux";
import { persistor, store } from "./app/config/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { AppEventProvider } from "./app/hooks/AppEventProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={defaultTheme}>
          <AppEventProvider>
            <QueryClientProvider client={queryClient}>
              <App />
            </QueryClientProvider>
          </AppEventProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
