/* eslint-disable jsx-a11y/anchor-is-valid */
import "./PurchaseHistory.css";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { setCart } from '../store/cart/cartSlice';
import { getPurchaseHistoryAPI } from "../api/user_profile";
import { setPurchaseHistory } from "../store/purchaseHistory/purchaseHistory";

function PurchaseHistory() {
  const purchaseHistory = useSelector(store => store.purchaseHistory)
  const dispatch = useDispatch();
  const token = useSelector(store => store.user.token);

  const MONTHS = [
    'Jan', 'Feb', 'Mar', "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"
  ]

  useEffect(() => {
    const purchaseHistory = localStorage.getItem('purchaseHistory');

    if (purchaseHistory) dispatch(setPurchaseHistory(JSON.parse(purchaseHistory)));

    getPurchaseHistoryAPI(token).then((res) => {
      const resData = res.data.map(item => {
        return {...item.product, purchasedOn : item.purchased_on};
      });

      dispatch(setPurchaseHistory(resData));
      localStorage.setItem('purchaseHistory', JSON.stringify(resData));
    });
  }, []);

  return <div className="container">
    <h2>Your Purchase History</h2>
    <div className="sidebar cart">
      <div class="showcase-container">

        { purchaseHistory.map((item, index) => <div class="showcase">
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

          <div className="purchased-on">
            Purchased on { (new Date(item.purchasedOn)).getDate() } { MONTHS[(new Date(item.purchasedOn)).getMonth()] }, { (new Date(item.purchasedOn)).getFullYear() }
          </div>

        </div>) }
      </div>
    </div>
  </div>;
}

export default PurchaseHistory;