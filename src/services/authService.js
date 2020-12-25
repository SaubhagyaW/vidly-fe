import jwtDecode from 'jwt-decode';
import Endpoints from '../util/endpoints';
import Constants from '../util/constants';
import http from './httpService';

const AUTH_URL = `${Endpoints.AUTH_ENDPOINT}`;

// Set Authentication header to all requests.
http.setJWTToken(localStorage.getItem(Constants.AUTH_HEADER));

export async function login(account) {
  const { headers } = await http.post(AUTH_URL, account);
  authenticateUser(headers);
}

export function authenticateUser(headers) {
  // Extract JWT token and save it to browser local storage.
  const jwtToken = headers[Constants.AUTH_HEADER];
  localStorage.setItem(Constants.AUTH_HEADER, jwtToken);
}

export function getCurrentUser() {
  try {
    const jwtToken = localStorage.getItem(Constants.AUTH_HEADER);
    return jwtDecode(jwtToken);
  } catch (e) {
    // Try-catch block is added to handle the scenarios which "jwtToken" is not in the browser local storage.
    return null;
  }
}

export function logout() {
  localStorage.removeItem(Constants.AUTH_HEADER);
}

export default {
  login,
  authenticateUser,
  getCurrentUser,
  logout
};
