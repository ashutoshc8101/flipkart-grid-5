import "./Category.css";
import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryItemsAPI } from "../api/product";
import { removeFavouritesAsync } from "../api/user_profile";
import toast from "react-hot-toast";
import { addToCartAsync } from "../api/user_profile";
import { removeFavourite } from "../store/favourites/favourites";
import { addToCart } from "../store/cart/cartSlice";

function Category() {

  const params = useParams();
  const token = useSelector(store => store.user.token);
  const [category, setCategory] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    getCategoryItemsAPI(params.id, token).then((res) => {
      setCategory(res.data);
    })
  }, [])

  return <>
    <div class="product-box">
      <div class="favourites">

        <h2 class="title">{ category && category.category.title }</h2>
        {(!category || (category && category.products.length === 0)) && <div className="category-infotext">
          No products are available in this category.</div>  }

        <div class="product-grid">

          { category && category.products.length > 0 && category.products.map((product, index) => <div className="showcase">

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
  </>
}

export default Category;