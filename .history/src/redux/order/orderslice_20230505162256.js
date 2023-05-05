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
      console.log("🚀 ~ file: orderslice.js:15 ~ action:", action);
      console.log("🚀 ~ file: orderslice.js:15 ~ state:", state);
      let carts = state.carts;
      const item = action.payload;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {},
});
export const { doAddBookAction } = orderSlice.actions;
export default orderSlice.reducer;
