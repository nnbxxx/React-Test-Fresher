import axios from "../utils/axiosCustumize";

export const callRegister = (fullName, email, password, phone) => {
  return axios.post("/", { fullName, email, password, phone });
};
