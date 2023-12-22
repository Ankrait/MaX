import axios from 'axios';

export const baseConfig = axios.create({
  baseURL: 'http://localhost:7777',
  withCredentials: true,
});
