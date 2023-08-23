import { createSlice } from "@reduxjs/toolkit";

const favouriteReducer = createSlice({
  name: "favourites",
  initialState: [],
  reducers: {
    addFavourite: (state, action) => {
      return [...state, action.payload];
    },
    removeFavourite: (state, action) => {
      state.splice(action.payload, 1)
    },
    setFavourites: (state, action) => {
      return action.payload;
    }
  }
});

export const { addFavourite, removeFavourite, setFavourites } = favouriteReducer.actions;

export default favouriteReducer.reducer;
