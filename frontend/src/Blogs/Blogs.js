/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import blog1 from "../assets/images/blog-1.jpg";
import blog2 from "../assets/images/blog-2.jpg";
import blog3 from "../assets/images/blog-3.jpg";
import blog4 from "../assets/images/blog-4.jpg";

function Blogs() {

  return <div class="blog">
    <div class="container">
      <div class="blog-container has-scrollbar">
        <div class="blog-card">
          <a href="#">
            <img src={blog1} alt="Clothes Retail KPIs 2021 Guide for Clothes Executives" width="300" class="blog-banner" />
          </a>

          <div class="blog-content">

            <a href="#" class="blog-category">Fashion</a>

            <a href="#">
              <h3 class="blog-title">Clothes Retail KPIs 2021 Guide for Clothes Executives.</h3>
            </a>

            <p class="blog-meta">
              By <cite>Mr Admin</cite> / <time datetime="2022-04-06">Apr 06, 2022</time>
            </p>

          </div>

        </div>

        <div class="blog-card">

          <a href="#">
            <img src={blog2} alt="Curbside fashion Trends: How to Win the Pickup Battle."
              class="blog-banner" width="300" />
          </a>

          <div class="blog-content">

            <a href="#" class="blog-category">Clothes</a>

            <h3>
              <a href="#" class="blog-title">Curbside fashion Trends: How to Win the Pickup Battle.</a>
            </h3>

            <p class="blog-meta">
              By <cite>Mr Robin</cite> / <time datetime="2022-01-18">Jan 18, 2022</time>
            </p>

          </div>

        </div>

        <div class="blog-card">

          <a href="#">
            <img src={blog3} alt="EBT vendors: Claim Your Share of SNAP Online Revenue."
              class="blog-banner" width="300" />
          </a>

          <div class="blog-content">

            <a href="#" class="blog-category">Shoes</a>

            <h3>
              <a href="#" class="blog-title">EBT vendors: Claim Your Share of SNAP Online Revenue.</a>
            </h3>

            <p class="blog-meta">
              By <cite>Mr Selsa</cite> / <time datetime="2022-02-10">Feb 10, 2022</time>
            </p>

          </div>

        </div>

        <div class="blog-card">

          <a href="#">
            <img src={blog4} alt="Curbside fashion Trends: How to Win the Pickup Battle."
              class="blog-banner" width="300" />
          </a>

          <div class="blog-content">

            <a href="#" class="blog-category">Electronics</a>

            <h3>
              <a href="#" class="blog-title">Curbside fashion Trends: How to Win the Pickup Battle.</a>
            </h3>

            <p class="blog-meta">
              By <cite>Mr Pawar</cite> / <time datetime="2022-03-15">Mar 15, 2022</time>
            </p>

          </div>

        </div>

      </div>

    </div>

  </div>;
}

export default Blogs;