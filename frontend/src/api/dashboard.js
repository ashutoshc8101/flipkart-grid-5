import axios from 'axios';
import config from '../config';

export const getDashboardAPI = async (token) => {
  const path = '/dashboard/'

  return await axios.get(config.API_URL + path, {
    headers: {
      'Authorization': 'Token ' + token
    }
  })
};