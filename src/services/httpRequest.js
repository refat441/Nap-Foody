
import axios from "axios";
const BASE_URL = "https://adminfoodi.napver.com/api";
const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 90000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  let token = localStorage.getItem("token");
  return {
    ...config,
    headers: {
      Authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const responseBody = (response) => response.data;

const requests = {
  get: (url, body, headers) =>
    instance.get(url, body, headers).then(responseBody),

  post: (url, body, headers) =>
    instance.post(url, body, headers).then(responseBody),

  put: (url, body, headers) =>
    instance.put(url, body, headers).then(responseBody),

  patch: (url, body, headers) =>
    instance.patch(url, body, headers).then(responseBody),

  delete: (url, body, headers) =>
    instance.delete(url, body, headers).then(responseBody),
};

export default requests;
