import axios from 'axios';
import { toast } from 'react-toastify';
import Constants from '../util/constants';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

function setJWTToken(jwtToken) {
  axios.defaults.headers.common[Constants.AUTH_HEADER] = jwtToken;
}

// Interceptor to handle errors.
axios.interceptors.response.use(null, (error) => {
  if (error.response && error.response.status === 400)
    toast.error('Invalid form input.');
  // else if (error.response && error.response.status === 404)
  //   toast.error('This record does not exist in DB.');
  else {
    console.error(error);
    toast.error('An unexpected error occurred.');
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJWTToken
};
