import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
const initialState = {
  carts: [],
};
export const orderSlice = createSlice({
  name: "order",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    //action
    doAddBookAction: (state, action) => {
      let carts = state.carts;
      const item = action.payload;
      let isExitsItem = carts.findIndex((c) => c._id === item._id);
      if (isExitsItem > -1) {
        carts[isExitsItem].quanlity += item.quanlity;
        if (carts[isExitsItem].quanlity > carts[isExitsItem].detail.quanlity) {
          carts[isExitsItem].quanlity = carts[isExitsItem].detail.quanlity;
        }
      } else {
        carts.push({
          quanlity: item.quanlity,
          _id: item._id,
          detail: item.detail,
        });
      }
      state.carts = carts;
      message.success("The product has been added to the shopping cart.");
    },
    doUpdateBookAction: (state, action) => {
      let carts = state.carts;
      const item = action.payload;
      let isExitsItem = carts.findIndex((c) => c._id === item._id);
      if (isExitsItem > -1) {
        carts[isExitsItem].quanlity = item.quanlity;
        if (carts[isExitsItem].quanlity > carts[isExitsItem].detail.quanlity) {
          carts[isExitsItem].quanlity = carts[isExitsItem].detail.quanlity;
        }
      }
      state.carts = carts;
    },
    doDeleteBookAction: (state, action) => {
      state.carts = state.carts.filter((c) => c._id !== action.payload._id);
    },
    doPlaceOrderAction: (state, action) => {
      state.carts = [];
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {},
});
export const {
  doAddBookAction,
  doUpdateBookAction,
  doDeleteBookAction,
  doPlaceOrderAction,
} = orderSlice.actions;
export default orderSlice.reducer;
