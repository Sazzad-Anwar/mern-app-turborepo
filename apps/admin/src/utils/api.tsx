import axios from "axios";
import config from "../config/config";

const api = axios.create({
  baseURL: config.url,
  withCredentials: true,
});

export default api;
