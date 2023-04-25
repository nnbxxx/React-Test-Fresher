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
  return axios.post("/api/v1/user/register", {
    email,
    password,
  });
};
