import "./Profile.css";
import { googleLogout } from '@react-oauth/google';
import React from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from "react-redux";
import { signout, updateName, updateAge,
  updateGender, updateEmail, updateLocation } from "../store/user/userSlice";
import { updateProfileAPI } from "../api/user_profile";

import toast from 'react-hot-toast';


function Profile() {
  const user = useSelector(store => store.user);
  const dispatch = useDispatch();

  return <div className="profile">
    <h1 className="heading">Your Profile</h1>
    <div className="profile-content">
      <div className="grid-item">
        <FormControl fullWidth>
          <TextField id="name-input"
                     aria-describedby="my-helper-text"
                     label="Name"
                     value={user.name}
                     onChange={(e) => {
                      dispatch(updateName(e.target.value))
                    }} />
        </FormControl>
      </div>
      <div className="grid-item">
        <FormControl fullWidth>
          <TextField id="email-input"
                     aria-describedby="my-helper-text"
                     label="Email"
                     value={user.email}
                     onChange={(e) => {
                      dispatch(updateEmail(e.target.value))
                     }}
                     disabled />
        </FormControl>
      </div>
      <div className="grid-item">
        <FormControl fullWidth>
          <TextField id="outlined-basic"
                     inputProps={{ type: 'number'}}
                     label="Age"
                     variant="outlined"
                     value={user.age}
                     onChange={(e) => {
                      dispatch(updateAge(e.target.value))
                     }}
                    />
        </FormControl>
      </div>

      <div className="grid-item">
        <FormControl fullWidth>
          <InputLabel>Gender</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
            value={ user.gender }
            onChange={(e) => {
              dispatch(updateGender(e.target.value))
            }}
          >
            <MenuItem value="M">Male</MenuItem>
            <MenuItem value="F">Female</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="grid-item">
        <FormControl fullWidth>
          <TextField
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Location"
            value={ user.location }
            onChange={(e) => {
              dispatch(updateLocation(e.target.value))
            }}
           />
        </FormControl>
      </div>
    </div>
    <div className="bottom-buttons">
      <Button variant="contained" onClick={async (e) => {
          await updateProfileAPI(user, user.token);
          localStorage.setItem('user', JSON.stringify(user));

          toast.success('Saved')
        }}>
        Save
      </Button>

      <Button variant="outlined" color="error" onClick={(e) => {
        localStorage.removeItem('user');
        localStorage.removeItem('favourites');
        localStorage.removeItem('cartItems');
        localStorage.removeItem('dashboard');
        googleLogout();
        dispatch(signout());
      }}>Sign Out</Button>
    </div>
  </div>;
}

export default Profile;