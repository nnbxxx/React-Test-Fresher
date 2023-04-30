import axios from "../utils/axiosCustumize";

export const callRegister = (fullName, email, password, phone) => {
  return axios.post("/api/v1/user/register", {
    fullName,
    email,
    password,
    phone,
  });
};
export const callLogin = (email, password) => {
  return axios.post(
    "/api/v1/auth/login",
    {
      username: email,
      password,
    },
    2000
  );
};
export const callGetUserWithPaginate = (query) => {
  return axios.get(`/api/v1/user?${query}`);
};
export const callFetchAccount = () => {
  return axios.get("/api/v1/auth/account");
};
export const callLogoutAccount = () => {
  return axios.post("/api/v1/auth/logout");
};
export const callPostCreateUser = (fullName, email, password, phone) => {
  return axios.post("/api/v1/user", {
    fullName,
    email,
    password,
    phone,
  });
};
export const callPostUserExcel = (data) => {
  return axios.post("/api/v1/auth/logout");
};
