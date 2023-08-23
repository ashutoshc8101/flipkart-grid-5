import "./Product.css";

import React from "react";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cart/cartSlice";
import { useEffect, useState } from "react";
import { getProductById } from "../api/product";
import toast from "react-hot-toast";
import { addToCartAsync } from "../api/user_profile";
import { Link } from "react-router-dom";

function Product() {
  const params = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState(null)
  const token = useSelector(store => store.user.token);

  useEffect(() => {
    getProductById(params.id, token).then((res) => {
      console.log(res.data);
      setProduct(res.data.product);
      setReviews(res.data.reviews);
    })
  }, []);

  if (!product) return null;

  const MONTHS = [
    'Jan', 'Feb', 'Mar', "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"
  ]


  return <>
    <div className="product-content">
      <div className="product-image">
        <img src={product.image_url} width="100%" alt="product" />
      </div>
      <div className="product-details">
        <div className="product-brand">{ product.brand }</div>
        <div className="product-title">{ product.title }</div>
        <Link to={'/category/' + product.category.id} className="product-category">{ product.category.title }</Link>
        <div className="product-rating">
          {Array.from({ length: Math.floor(product.rating) }, (value, index) => <ion-icon name="star"></ion-icon> )}
          {Array.from({ length: Math.ceil(5 - product.rating) }, (value, index) => <ion-icon name="star-outline"></ion-icon> )}
        </div>
        <div className="product-price-box">
          <div className="product-price">${ product.selling_price }</div>
          <del>${ product.actual_price }</del>
        </div>
        <Button variant="contained"
                size="small"
                className="add-to-cart-btn"
                onClick={async (e) => {
                    await addToCartAsync(product.id, token);
                    dispatch(addToCart(product));
                    toast.success('Added to cart')
                }}>
                Add to Cart</Button>

        <div className="product-description-title">Description:</div>
        <div className="product-description">
          { product.description }
        </div>
      </div>
    </div>

    <div className="product-reviews">
      <h3>Reviews</h3>

      { reviews && reviews.map((review) =>  <div className="product-review">
        <div className="product-review-header">
          <div className="product-review-author">
            { review.user_detail.user.first_name + ' ' + review.user_detail.user.last_name }
          </div>
          <div className="product-review-timestamp">
            Reviewed on { (new Date(review.created_at)).getDate() } { MONTHS[(new Date(review.created_at)).getMonth()] }, { (new Date(review.created_at)).getFullYear() }
          </div>
        </div>
        <div className="product-review-description">
          { review.review }
        </div>
      </div> ) }
    </div>
  </>;
}

export default Product;