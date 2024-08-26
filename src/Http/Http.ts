import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.comasdas';

export const Http = axios.create({
  baseURL: BASE_URL,
});
