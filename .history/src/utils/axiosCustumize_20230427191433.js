import axios from "axios";
const baseURL = import.meta.env.VITE_BACK_END_URL;
const instance = axios.create({
  baseURL: baseURL,
  timeout: 1000,
  withCredentials: true,
});
// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
instance.defaults.headers.common = {
  Authorization: `bearer ${localStorage.getItem("access_token")}`,
};
// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.config && error.response && error.response.status === 401) {
      return updateToken().then((token) => {
        //error.config.headers.xxxx <= set the token
        return axios.request(error.config);
      });

    return error?.response?.data ?? Promise.reject(error);
  }
);
export default instance;