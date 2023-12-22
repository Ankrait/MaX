import axios, { AxiosError } from 'axios';

export const baseConfig = axios.create({
  baseURL: 'http://localhost:7777',
});

baseConfig.interceptors.request.use(
  req => {
    const token = localStorage.getItem('token');

    req.headers['Authorization'] = token;
    return req;
  },
  error => Promise.reject(error),
);

let num = { value: 0 };

baseConfig.interceptors.response.use(
  res => res,
  async error => {
    if (error?.response?.status === 403 && num.value <= 3) {
      num.value++;
      console.log(1);

      const originalRequestConfig = error.config!;
      const { data } = await baseConfig.get('/auth/refresh', { withCredentials: true });
      console.log(2);
      localStorage.setItem('token', data.token);
      return baseConfig.request(originalRequestConfig);
    } else {
      num.value = -1;
    }

    return new Promise(error);
  },
);
