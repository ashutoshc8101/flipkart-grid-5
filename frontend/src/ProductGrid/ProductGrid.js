/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import NewProducts from "../NewProducts/NewProducts";
import TopRated from "../TopRated/TopRated";
import Trending from "../Trending/Trending";

function ProductGrid() {
  return <div class="product-container">
    <div class="container">
      <Sidebar />

      <div class="product-box">
        <div class="product-minimal">
          <Trending />
          <TopRated />
      </div>


      <NewProducts />
    </div>
    </div>
  </div>;
}

export default ProductGrid;