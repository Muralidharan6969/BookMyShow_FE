import axios from "../config/axios.interceptor";

export const get = async ({
  url,
  data = {},
  customHeaders = "application/json",
}) => {
  try {
    const response = await axios.get(url, {
      params: data,
      headers: {
        "Content-Type": customHeaders,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const post = async ({
  url,
  data,
  customHeaders = "application/json",
}) => {
  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": customHeaders,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const put = async ({
  url,
  id,
  data,
  customHeaders = "application/json",
}) => {
  try {
    const response = await axios.put(`${url}/${id}`, data, {
      headers: {
        "Content-Type": customHeaders,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const deleteApi = async ({
  url,
  id,
  customHeaders = "application/json",
}) => {
  try {
    const response = await axios.delete(`${url}/${id}`, {
      headers: {
        "Content-Type": customHeaders,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};
