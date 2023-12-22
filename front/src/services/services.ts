import { baseConfig } from './baseConfig';
import {
  ISessionResponse,
  ILoginRequest,
  IRegistrationRequest,
  IUser,
  IUserRequest,
} from './services.interface';

export const authService = {
  async getSession() {
    const { data } = await baseConfig.get<ISessionResponse>('/auth/session', {
      withCredentials: true,
    });
    return data;
  },
  async login(req: ILoginRequest) {
    const { data } = await baseConfig.post('/auth/login', req, { withCredentials: true });
    localStorage.setItem('token', data.token);
  },
  async registration(req: IRegistrationRequest) {
    const { data } = await baseConfig.post('/auth/registration', req, {
      withCredentials: true,
    });
    localStorage.setItem('token', data.token);
  },
  async logout() {
    await baseConfig.get('/auth/logout');
    localStorage.setItem('token', '');
  },
};

export const userService = {
  async getInfo() {
    const { data } = await baseConfig.get<IUser>(`/users`);
    return data;
  },
  async setInfo(req: IUserRequest) {
    const { data } = await baseConfig.put<IUser>(`/users`, req);
    return data;
  },
};
