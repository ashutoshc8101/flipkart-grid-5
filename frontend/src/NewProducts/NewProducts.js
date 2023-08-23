import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addFavourite } from "../store/favourites/favourites";
import { addToCart } from "../store/cart/cartSlice";
import toast from "react-hot-toast";
import { addToCartAsync, addToFavouritesAsync } from "../api/user_profile";

function NewProducts() {

  const products = useSelector(store => store.dashboard.newProducts)
  const token = useSelector(store => store.user.token);

  const dispatch = useDispatch();

  return <div class="product-main">
    <h2 class="title">New Products</h2>

    <div class="product-grid">

      { products.map((product) => <div class="showcase">

        <div class="showcase-banner">

          <Link to={'/product/' + product.id}>
            <img src={product.image_url}
                alt="Mens Winter Leathers Jackets"
                class="product-img default" />
            <img src={product.image_url}
                alt="Mens Winter Leathers Jackets"
                class="product-img hover" />

          </Link>

          <div class="showcase-actions">

            <button class="btn-action" onClick={async e => {

                await addToFavouritesAsync(product.id, token);

                dispatch(addFavourite(product));
                toast.success('Add to favourites')
              }}>
              <ion-icon name="heart-outline"></ion-icon>
            </button>

            <button class="btn-action" onClick={async e => {

                await addToCartAsync(product.id, token);
                dispatch(addToCart(product));
                toast.success('Added to cart')
              }}>
              <ion-icon name="bag-add-outline"></ion-icon>
            </button>

          </div>

        </div>

        <div class="showcase-content">
          <div class="showcase-category">{ product.brand }</div>

          <Link to={'/product/' + product.id}>
            <h3 class="showcase-title">{ product.title }</h3>
          </Link>

          <div class="showcase-rating">
            {Array.from({ length: Math.floor(product.rating) }, (value, index) => <ion-icon name="star"></ion-icon> )}
            {Array.from({ length: Math.ceil(5 - product.rating) }, (value, index) => <ion-icon name="star-outline"></ion-icon> )}
          </div>

          <div class="price-box">
            <p class="price">${ product.selling_price }</p>
            <del>${ product.actual_price }</del>
          </div>
        </div>
      </div> )}

    </div>
  </div>;
}

export default NewProducts;