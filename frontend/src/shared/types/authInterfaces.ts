export interface LoginUser {
  email: string;
  password: string;
}

export interface RegisterUser {
  username: string;
  email: string;
  password: string;
  role: string;
}

export interface RecoveryUser{
  email:string
}

export interface Token {
  token: string;
}
