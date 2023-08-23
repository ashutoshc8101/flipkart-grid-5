/* eslint-disable jsx-a11y/anchor-is-valid */
import "./Cart.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from '@mui/material/Button';
import { removeFromCart } from "../store/cart/cartSlice";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { setCart } from '../store/cart/cartSlice';
import { getCartItemsAPI } from "../api/user_profile";
import { removeCartItemAsync } from "../api/user_profile";
import toastr from "react-hot-toast";

function Cart() {
  const cartItems = useSelector(store => store.cart)
  const dispatch = useDispatch();
  const token = useSelector(store => store.user.token);

  useEffect(() => {
    const cartItems = localStorage.getItem('cartItems');

    if (cartItems) dispatch(setCart(JSON.parse(cartItems)));

    getCartItemsAPI(token).then((res) => {
      const resData = res.data.map(item => item.product);

      dispatch(setCart(resData));
      localStorage.setItem('cartItems', JSON.stringify(resData))
    });
  }, []);

  return <div className="container">
    <h2>Your Cart</h2>
    <div className="sidebar cart">
      <div class="showcase-container">

        { cartItems.map((item, index) => <div class="showcase">
          <div className="metadata">
            <Link to={'/product/' + item.id}>
              <a href="#" class="showcase-img-box">
                <img src={item.image_url} alt="baby fabric shoes" width="75" height="75"
                  class="showcase-img" />
              </a>
            </Link>

            <div class="showcase-content">
              <Link to={'/product/' + item.id}>
                <h3 class="cart-item-title">{ item.title }</h3>
              </Link>

              <div class="showcase-rating">
                {Array.from({ length: Math.floor(item.rating) },
                  (value, index) => <ion-icon name="star"></ion-icon> )}

                {Array.from({ length: Math.ceil(5 - item.rating) },
                  (value, index) => <ion-icon name="star-outline"></ion-icon> )}
              </div>

              <div class="price-box">
                <del>${ item.actual_price }</del>
                <p class="price">${ item.selling_price }</p>
              </div>

            </div>
          </div>
          <div className="">
            <Button variant="outlined" color="error" onClick={async (e) => {
                await removeCartItemAsync(item.id, token);
                dispatch(removeFromCart(index));
                toastr.success('Succesfully removed')
              }}>
              Remove
            </Button>
          </div>

        </div>) }
      </div>
    </div>
  </div>;
}

export default Cart;