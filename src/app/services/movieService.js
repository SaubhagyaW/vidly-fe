import Endpoints from '../util/endpoints';
import http from './httpService';

const MOVIES_URL = `${Endpoints.BASE_URL}${Endpoints.MOVIES_ENDPOINT}`;

export async function saveMovie(movie) {
  return await http.post(MOVIES_URL, movie);
}

export async function getMovies() {
  return await http.get(MOVIES_URL);
}

export async function getMovie(id) {
  return await http.get(`${MOVIES_URL}/${id}`);
}

export async function updateMovie(id, movie) {
  return await http.put(`${MOVIES_URL}/${id}`, movie);
}

export async function deleteMovie(id) {
  return await http.delete(`${MOVIES_URL}/${id}`);
}

export default {
  saveMovie,
  getMovies,
  getMovie,
  updateMovie,
  deleteMovie
};
