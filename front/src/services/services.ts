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
    const { data } = await baseConfig.get<ISessionResponse>('/auth/session');
    return data;
  },
  async login(req: ILoginRequest) {
    await baseConfig.post('/auth/login', req);
  },
  async registration(req: IRegistrationRequest) {
    await baseConfig.post('/auth/registration', req);
  },
  async logout() {
    await baseConfig.get('/auth/logout');
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
  }
};
