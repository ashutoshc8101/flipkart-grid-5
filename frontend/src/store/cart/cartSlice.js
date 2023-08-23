import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      return [...state, action.payload];
    },
    removeFromCart: (state, action) => {
      state.splice(action.payload, 1)
    },
    setCart: (state, action) => {
      return action.payload;
    }
  }
});

export const { addToCart, removeFromCart, setCart } = cartSlice.actions;

export default cartSlice.reducer;
