import Endpoints from '../util/endpoints';
import http from './httpService';

const USERS_URL = `${Endpoints.BASE_URL}${Endpoints.USERS_ENDPOINT}`;

export async function saveUser(user) {
  return await http.post(USERS_URL, user);
}

export default {
  saveUser
};
