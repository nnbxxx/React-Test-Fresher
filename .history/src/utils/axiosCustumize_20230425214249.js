import axios from "axios";
const baseURL = import.meta.env.VITE_BACK_END_URL;
const instance = axios.create({
  baseURL: baseURL,
  timeout: 1000,
});
export default instance;
