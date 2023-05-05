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
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {},
});
export const {} = orderSlice.actions;
export default orderSlice.reducer;
