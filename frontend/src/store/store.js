import { createBrowserHistory } from "history";
import { configureStore } from "@reduxjs/toolkit";

// TODO: import all reducers down below here.
import userSliceReducer from "./user/userSlice";
import favouriteReducer from "./favourites/favourites";
import cartReducer from "./cart/cartSlice";
import dashboardReducer from "./dashboard/dashboardSlice";
import purchaseHistoryReducer from "./purchaseHistory/purchaseHistory";

export const history = createBrowserHistory();

// combineReducers will be handled internally by configureStore
const rootReducer = (history) => ({
  user: userSliceReducer,
  favourites: favouriteReducer,
  cart: cartReducer,
  dashboard: dashboardReducer,
  purchaseHistory: purchaseHistoryReducer
});

const preloadedState = {};

const store = configureStore({
  reducer: rootReducer(history),
  preloadedState,
});

export default store;
