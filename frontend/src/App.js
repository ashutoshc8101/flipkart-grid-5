import './App.css';

import React from "react";
import Header from './Header/Header';
import { Route, Routes } from "react-router-dom";
import Profile from './Profile/Profile';
import Favourites from './Favourites/Favourites';
import Cart from './Cart/Cart';
import Signin from './Signin/Signin';

import { useDispatch, useSelector } from "react-redux";
import Product from './Product/Product';
import { useEffect } from 'react';
import { setUser } from './store/user/userSlice';

import { Toaster } from 'react-hot-toast';

import Dashboard from './Dashboard/Dashboard';
import PurchaseHistory from './PurchaseHistory/PurchaseHistory';
import Category from "./Category/Category";

function App() {
  const token = useSelector(store => store.user.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem('user');

    if (user) dispatch(setUser(JSON.parse(user)));
  }, []);

  if (!token) return <Signin />

  return (
    <div className="App">
      <div class="overlay" data-overlay></div>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/favourites" element={<Favourites />} />

        <Route path="/profile" element = {<Profile />} />

        <Route path="/product/:id" element = {<Product />} />

        <Route path="/category/:id" element = { <Category /> } />

        <Route path="/payment_history" element = {<PurchaseHistory />} />
      </Routes>

      <Toaster position="bottom-right" />
    </div>
  );
}


export default App;
