import axios from "axios";
import config from "../config";

export const updateProfileAPI = async (user, token) => {

  const PATH = '/user_profile/';

  return await axios.post(config.API_URL + PATH, user, {
    headers: {
      'Authorization': 'Token ' + token
    }
  });
};

export const getFavouritesAPI = async (token) => {
  const PATH = '/user_profile/favourites';

  return await axios.get(config.API_URL + PATH, {
    headers: {
      'Authorization': 'Token ' + token
    }
  })
};

export const addToFavouritesAsync = async (productId, token) => {
  const path = '/user_profile/favourites/';

  return await axios.post(config.API_URL + path, {
    productId: productId,
  }, {
    headers: {
      'Authorization': 'Token ' + token
    }
  })
}

export const removeFavouritesAsync = async (productId, token) => {
  const path = '/user_profile/favourites/delete';

  return await axios.post(config.API_URL + path, {
      'product_id': productId
    }, {
    headers: {
      'Authorization': 'Token ' + token
    }
  })
};

export const getCartItemsAPI = async (token) => {
  const PATH = '/user_profile/cart/';

  return await axios.get(config.API_URL + PATH, {
    headers: {
      'Authorization': 'Token ' + token
    }
  })
};

export const addToCartAsync = async (productId, token) => {
  const path = '/user_profile/cart/';

  return await axios.post(config.API_URL + path, {
    productId: productId,
  }, {
    headers: {
      'Authorization': 'Token ' + token
    }
  })
}

export const removeCartItemAsync = async (productId, token) => {
  const path = '/user_profile/cart/delete';

  return await axios.post(config.API_URL + path, {
      'product_id': productId
    }, {
    headers: {
      'Authorization': 'Token ' + token
    }
  })
};


export const getPurchaseHistoryAPI = async (token) => {
  const path = '/user_profile/purchase_history';

  return await axios.get(config.API_URL + path, {
    headers: {
      'Authorization': 'Token ' + token
    }
  });
};
