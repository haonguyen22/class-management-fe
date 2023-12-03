export interface ISignup {
  name: string;
  email: string;
  password: string;
  phone: string;
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
}

export interface IError {
  message: string;
  status: number;
}

export interface IErrorResponse {
  data: object,
  status: number,
  statusText: string,
  
}