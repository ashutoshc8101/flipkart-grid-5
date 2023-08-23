import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    topRated: [],
    newProducts: []
  },
  reducers: {
    setDashboard: (state, action) => {
      return action.payload;
    }
  }
});

export const { setDashboard } = dashboardSlice.actions;

export default dashboardSlice.reducer;
