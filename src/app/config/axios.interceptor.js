import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BOOKMYSHOW_API_URL,
});

const getTokenFromSessionStorage = () => {
  const token = sessionStorage.getItem("bms-auth-token");
  const sanitizedToken = token ? token.replace(/"/g, "") : "";
  return sanitizedToken;
};

instance.interceptors.request.use(function (config) {
  const token = getTokenFromSessionStorage();
  config.headers["bms-auth-token"] = token;
  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const normalizedError = {
      message:
        error.response?.data?.message || error.message || "An error occurred",
      status: error.response?.status || 500,
      data: error.response?.data || null,
    };

    console.error(normalizedError);

    return Promise.reject(normalizedError);
  }
);

export default instance;
