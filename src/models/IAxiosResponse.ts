export interface ISignup {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IMessage {
  message: string;
  metadata: Record<string, unknown>;
  status: number;
}

export interface IResponse {
  data: Record<string, unknown>;
  status: number;
  message: string;
  metadata: unknown;
}

export interface IError<T> {
  message: string;
  name: number;
  response?: T;
}

export interface IErrorResponse {
  data: any;
  status: number;
  statusText: string;
}

export interface IClassDetail {
  id: number;
  name: string;
  description: string;
}
