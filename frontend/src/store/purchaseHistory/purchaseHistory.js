import { createSlice } from "@reduxjs/toolkit";

const historySlice = createSlice({
  name: "purchaseHistory",
  initialState: [],
  reducers: {
    setPurchaseHistory: (state, action) => {
      return action.payload;
    }
  }
});

export const { setPurchaseHistory } = historySlice.actions;

export default historySlice.reducer;
