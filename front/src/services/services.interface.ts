export interface ISessionResponse {
  id: number;
  login: string;
  email: string;
}

export interface ILoginRequest {
  email_login: string;
  password: string;
}

export interface IRegistrationRequest {
  email: string;
  login: string;
  password: string;
}

export interface IUser {
  id: number;
  age: number | null;
  city: string | null;
  sex: 'MALE' | 'FEMALE' | null;
}

export interface IUserRequest {
  age: number | null;
  city: string | null;
  sex: 'MALE' | 'FEMALE' | null;
}
