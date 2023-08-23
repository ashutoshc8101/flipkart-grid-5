import React from "react";
import ProductCategories from '../ProductCategories/ProductCategories';
import ProductGrid from '../ProductGrid/ProductGrid';
import Blogs from '../Blogs/Blogs';
import Footer from '../Footer/Footer';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardAPI } from '../api/dashboard';
import { setDashboard } from '../store/dashboard/dashboardSlice';

function Dashboard() {
  const token = useSelector(store => store.user.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const dashboardData = localStorage.getItem('dashboard');

    if (dashboardData) dispatch(setDashboard(JSON.parse(dashboardData)));

    getDashboardAPI(token).then((res) => {

      const dashboardData = {
        categories: res.data.categories,
        topRated: res.data.top_rated_products,
        newProducts: res.data.new_products,
        trending: res.data.trending.map((favourite) => favourite.product),
        bestSellers : res.data.best_sellers.map((bestSeller) => bestSeller.product)
      };

      dispatch(setDashboard(dashboardData));

      localStorage.setItem('dashboard', JSON.stringify(dashboardData));
    })
  }, []);

  return <>
    {/* <CategoryMenu />
    <Banner /> */}
    <ProductCategories />
    <ProductGrid />
    <Blogs />
    <Footer />
  </>;
}

export default Dashboard;