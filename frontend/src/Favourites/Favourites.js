import "./Favourites.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFavourite, setFavourites } from "../store/favourites/favourites";
import { addToCart } from "../store/cart/cartSlice";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getFavouritesAPI, removeFavouritesAsync } from "../api/user_profile";
import toast from "react-hot-toast";
import { addToCartAsync } from "../api/user_profile";

function Favourites() {
  const favourites = useSelector(store => store.favourites);
  const token = useSelector(store => store.user.token);
  const dispatch = useDispatch();

  useEffect(() => {

    const favourites = localStorage.getItem('favourites');

    if (favourites) dispatch(setFavourites(JSON.parse(favourites)));

    getFavouritesAPI(token).then((res) => {
      const resData = res.data.map((item) => item.product);

      dispatch(setFavourites(resData));

      localStorage.setItem('favourites', JSON.stringify(resData))
    })
  }, []);

  return <>
    <div class="product-box">
      <div class="favourites">

        <h2 class="title">Your favourites</h2>

        <div class="product-grid">

          { favourites.map((product, index) => <div className="showcase">

            <div class="showcase-banner">
              <Link to={'/product/' + product.id}>
                <img src={product.image_url} alt="Mens Winter Leathers Jackets" width="300" class="product-img default" />
                <img src={product.image_url} alt="Mens Winter Leathers Jackets" width="300" class="product-img hover" />
              </Link>

              <div className="showcase-actions">
                <button class="btn-action" onClick={async e => {
                    await removeFavouritesAsync(product.id, token);

                    dispatch(removeFavourite(product));
                    toast.success('Add to favourites')
                  }}>
                  <ion-icon name="heart-dislike-outline"></ion-icon>
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
      </div>
    </div>
  </>;
}

export default Favourites;