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
  return axios.post("/api/v1/user/bulk-create", data);
};
export const callPutUpdateUser = (_id, fullName, phone) => {
  return axios.put("/api/v1/user", { _id, fullName, phone });
};
export const callDeleteUser = (_id) => {
  return axios.delete(`/api/v1/user/${_id}`);
};

export const callGetBooksWithPaginate = (query) => {
  return axios.get(`/api/v1/book?${query}`);
};
export const callGetBooksCategory = () => {
  return axios.get(`/api/v1/database/category`);
};
export const callUploadBookImg = (fileImg) => {
  const bodyFormData = new FormData();
  bodyFormData.append("fileImg", fileImg);
  return axios({
    method: "post",
    url: "/api/v1/file/upload",
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
      "upload-type": "book",
    },
  });
};
export const callPostCreateBook = (
  thumbnail,
  slider,
  mainText,
  author,
  price,
  sold,
  quantity,
  category
) => {
  return axios.post(`/api/v1/book`, {
    thumbnail,
    slider,
    mainText,
    author,
    price,
    sold,
    quantity,
    category,
  });
};
export const callPutUpdateBook = (
  _id,
  thumbnail,
  slider,
  mainText,
  author,
  price,
  sold,
  quantity,
  category
) => {
  return axios.put(`/api/v1/book/${_id}`, {
    thumbnail,
    slider,
    mainText,
    author,
    price,
    sold,
    quantity,
    category,
  });
};
export const callDeleteBook = (_id) => {
  return axios.delete(`/api/v1/book/${_id}`);
};
export const callGetBookDetailById = (_id) => {
  return axios.get(`/api/v1/book/${_id}`);
};
export const callPostCreateOrder = (data) => {
  return axios.post(`/api/v1/order`, data);
};
export const callGetOrderHistory = () => {
  return axios.get(`/api/v1/history`);
};
export const callPostChangePassword = (email, oldpass, newpass) => {
  return axios.post("/api/v1/user/change-password", {
    email,
    oldpass,
    newpass,
  });
};
export const callUploadAvatarImg = (fileImg) => {
  const bodyFormData = new FormData();
  bodyFormData.append("fileImg", fileImg);
  return axios({
    method: "post",
    url: "/api/v1/file/upload",
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
      "upload-type": "avatar",
    },
  });
};
export const callPutUpdateInfor = (fullName, phone, avatar, _id) => {
  return axios.put("/api/v1/user", {
    fullName,
    phone,
    avatar,
    _id,
  });
};
export const callGetOrdersWithPaginate = (query) => {
  return axios.get(`/api/v1/order?${query}`);
};
export const callGetDashBoard = () => {
  return axios.get(`/api/v1/database/dashboard`);
};
