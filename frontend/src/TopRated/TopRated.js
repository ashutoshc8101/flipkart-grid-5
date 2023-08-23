import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function TopRated() {

  const topRated = useSelector(store => store.dashboard.topRated);

  return <div class="product-showcase">
    <h2 class="title">Top Rated</h2>

    <div class="showcase-wrapper has-scrollbar">

      <div class="showcase-container">

        { topRated.slice(0, 4).map((product) => <div class="showcase">

          <Link to={'/product/' + product.id} class="showcase-img-box">
            <img src={product.image_url} alt="pocket watch leather pouch" class="showcase-img"
              width="70" />
          </Link>

          <div class="showcase-content">

            <Link to={'/product/' + product.id}>
              <h4 class="showcase-title">{ product.title }</h4>
            </Link>

            <Link to={'/category/' + product.category.id} class="showcase-category">
              { product.category.title }
            </Link>

            <div class="price-box">
              <p class="price">${ product.selling_price }</p>
              <del>${ product.actual_price }</del>
            </div>

          </div>

        </div> ) }
      </div>

      { topRated.length > 4 && <div class="showcase-container">
        { topRated.slice(4, 4).map((product) => <div class="showcase">

          <Link to={'/product/' + product.id} class="showcase-img-box">
            <img src={product.image_url} alt="pocket watch leather pouch" class="showcase-img"
              width="70" />
          </Link>

          <div class="showcase-content">

            <Link to={'/product/' + product.id}>
              <h4 class="showcase-title">{ product.title }</h4>
            </Link>

            <a href="#" class="showcase-category">{ product.category.title }</a>

            <div class="price-box">
              <p class="price">${ product.selling_price }</p>
              <del>${ product.actual_price }</del>
            </div>

          </div>

        </div>) }
      </div> }

    </div>

  </div>;
}

export default TopRated;