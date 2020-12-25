import Endpoints from '../util/endpoints';
import http from './httpService';

const GENRES_URL = `${Endpoints.GENRES_ENDPOINT}`;

export async function saveGenre(genre) {
  return await http.post(GENRES_URL, genre);
}

export async function getGenres() {
  return await http.get(GENRES_URL);
}

export default {
  saveGenre,
  getGenres
};
