/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Sidebar() {
  const dashboard = useSelector(store => store.dashboard);

  return <div class="sidebar has-scrollbar" data-mobile-menu>
    <div class="sidebar-category">

      <div class="sidebar-top">
        <h2 class="sidebar-title">Category</h2>

        <button class="sidebar-close-btn" data-mobile-menu-close-btn>
          <ion-icon name="close-outline"></ion-icon>
        </button>
      </div>

      <ul class="sidebar-menu-category-list">

        { dashboard && dashboard.categories && dashboard.categories.map((category) => <li class="sidebar-menu-category">

          <Link to={'/category/' + category.id} class="sidebar-accordion-menu">

            <div class="menu-title-flex">
              <img src={category.icon_url} alt="clothes" width="20" height="20"
                class="menu-title-img" />

              <p class="menu-title">{ category.title }</p>
            </div>

            <div>
              <ion-icon name="add-outline" class="add-icon"></ion-icon>
              <ion-icon name="remove-outline" class="remove-icon"></ion-icon>
            </div>

          </Link>

          {/* <ul class="sidebar-submenu-category-list" data-accordion>

            <li class="sidebar-submenu-category">
              <a href="#" class="sidebar-submenu-title">
                <p class="product-name">Shirt</p>
                <data value="300" class="stock" title="Available Stock">300</data>
              </a>
            </li>

            <li class="sidebar-submenu-category">
              <a href="#" class="sidebar-submenu-title">
                <p class="product-name">shorts & jeans</p>
                <data value="60" class="stock" title="Available Stock">60</data>
              </a>
            </li>

            <li class="sidebar-submenu-category">
              <a href="#" class="sidebar-submenu-title">
                <p class="product-name">jacket</p>
                <data value="50" class="stock" title="Available Stock">50</data>
              </a>
            </li>

            <li class="sidebar-submenu-category">
              <a href="#" class="sidebar-submenu-title">
                <p class="product-name">dress & frock</p>
                <data value="87" class="stock" title="Available Stock">87</data>
              </a>
            </li>

          </ul> */}

        </li> ) }

      </ul>

    </div>

    <div class="product-showcase">

      <h3 class="showcase-heading">best sellers</h3>

      <div class="showcase-wrapper">

        <div class="showcase-container">

          { dashboard && dashboard.bestSellers && dashboard.bestSellers.map((product) => <div class="showcase">

            <Link to={'/product/' + product.id} class="showcase-img-box">
              <img src={product.image_url} alt="baby fabric shoes" width="75" height="75"
                class="showcase-img" />
            </Link>

            <div class="showcase-content">

              <Link to={'/product/' + product.id}>
                <h4 class="showcase-title">{ product.title }</h4>
              </Link>

              <div class="showcase-rating">
                {Array.from({ length: Math.floor(product.rating) },
                  (value, index) => <ion-icon name="star"></ion-icon> )}

                {Array.from({ length: Math.ceil(5 - product.rating) },
                  (value, index) => <ion-icon name="star-outline"></ion-icon> )}
              </div>

              <div class="price-box">
                <del>${ product.actual_price }</del>
                <p class="price">${ product.selling_price }</p>
              </div>

            </div>

          </div> ) }

        </div>

      </div>

    </div>

  </div>;
}

export default Sidebar;