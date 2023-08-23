import axios from 'axios';
import config from '../config';

export const getInferenceAsync = async (prompt, token) => {
  const path = '/inference';
  const params = '?prompt=' + prompt;

  const url = config.API_URL + path + params;

  return await axios.get(url, {
    headers: {
      'Authorization': 'Token ' + token
    }
  })
};

