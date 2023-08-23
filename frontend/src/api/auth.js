import axios from 'axios';
import config from "../config";

export const loginAsync = async (idToken) => {
  const path = "/auth/register/";
  const body = {
    'id_token': idToken
  };

  return await axios.post(config.API_URL + path, body);
};