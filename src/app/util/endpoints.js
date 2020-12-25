import config from '../../resources/config.json';

export default class Endpoints {
  static BASE_URL = config.BASE_URL;
  static USERS_ENDPOINT = '/api/users';
  static AUTH_ENDPOINT = '/auth';
  static GENRES_ENDPOINT = '/api/genres';
  static MOVIES_ENDPOINT = '/api/movies';
}
