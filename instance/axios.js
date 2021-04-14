import Axios from 'axios';

const { API_KEY, SERVICE_ID } = process.env;

const api = Axios.create({
  baseURL: `https://${SERVICE_ID}.microcms.io/api/v1/`,
  headers: { 'X-API-KEY': API_KEY },
});

export default api;
