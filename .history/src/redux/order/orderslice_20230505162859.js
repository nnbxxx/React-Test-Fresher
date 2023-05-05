import { createSlice } from "@reduxjs/toolkit";
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
      console.log("🚀 ~ file: orderslice.js:13 ~ carts:", carts);
      const item = action.payload;
      console.log("🚀 ~ file: orderslice.js:15 ~ item:", item);
      let isExitsItem = carts.findIndex((book) => {
        book._id === item._id;
      });
      /*if (isExitsItem > -1) {
        carts[isExitsItem].quality += item.quality;
      } else {
        carts.push({
          quality: item.quality,
          _id: item._id,
          detail: item.detail,
        });
      }*/
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {},
});
export const { doAddBookAction } = orderSlice.actions;
export default orderSlice.reducer;