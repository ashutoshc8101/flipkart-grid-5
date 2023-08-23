import axios from "axios";
import config from "../config";

export const getProductById = async (productId, token) => {

  const PATH = '/products/';
  const queryParams = '?id=' + productId;

  return await axios.get(config.API_URL + PATH + queryParams, {
    headers: {
      'Authorization': 'Token ' + token
    }
  });
};

export const getCategoryItemsAPI = async (categoryId, token) => {
  const path = '/products/category';
  const params = '?category_id=' + categoryId;

  return await axios.get(config.API_URL + path + params, {
    headers: {
      'Authorization': 'Token ' + token
    }
  })
};