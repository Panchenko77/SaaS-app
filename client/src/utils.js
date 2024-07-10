import axios from "axios";
import store from "./redux/store";
// import { LOGOUT } from '../redux/constants/userConstant';
// Create an instance of axios
const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URI,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add the token to the headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      store.dispatch({ type: "LOGOUT" });
    }
    return Promise.reject(error);
  }
);

export default api;
