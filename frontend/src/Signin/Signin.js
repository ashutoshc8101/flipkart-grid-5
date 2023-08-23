import React from "react";
import { GoogleLogin } from '@react-oauth/google';
import logo from "../assets/images/logo/logo.png"

import "./Signin.css";
import { useDispatch } from 'react-redux';
import { setUser } from '../store/user/userSlice';
import { loginAsync } from '../api/auth';

function Signin() {
  const dispatch = useDispatch();

  return <div className="login-page">
    <div className='login-heading'>Welcome</div>
    <div className='app-logo'>
      <img src={logo} width="150" alt="app logo" />
    </div>
    <div className='login-subheading'>Signin using social links.</div>
    <div className="google-login">
      <GoogleLogin
        size = "large"
        width= "300px"
        useOneTap="true"
        onSuccess={async (credentialResponse) => {
          const response = await loginAsync(credentialResponse.credential);

          console.log(response);

          const user = {
            token: response.data.token,
            name: response.data.user_details.user.first_name + " " + response.data.user_details.user.last_name,
            email: response.data.user_details.user.email,
            age: response.data.user_details.age,
            gender: response.data.user_details.gender,
            location: response.data.user_details.location
          };

          localStorage.setItem('user', JSON.stringify(user));
          dispatch(setUser(user));
        }}
        onError={() => {
          console.log('Login Failed');
        }}
        auto_select="true"
      />
    </div>
  </div>;
}

export default Signin;