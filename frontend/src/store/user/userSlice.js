import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: '',
    token: null,
    email: '',
    age: null,
    gender: null,
    location: null
  },
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    signout: (state, action) => {
      return {
        name: '',
        token: null,
        email: '',
        age: null,
        gender: null,
        location: null
      }
    },
    updateName: (state, action) => {
      state.name = action.payload;
    },
    updateAge: (state, action) => {
      state.age = action.payload;
    },
    updateEmail: (state, action) => {
      state.email = action.payload;
    },
    updateGender: (state, action) => {
      state.gender = action.payload;
    },
    updateLocation: (state, action) => {
      state.location = action.payload;
    }
  }
});

export const { setUser, updateAge, updateEmail, updateGender,
  updateName, updateLocation, setToken, signout } = userSlice.actions;

export default userSlice.reducer;
