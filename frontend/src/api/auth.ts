import { LoginUser, RegisterUser, Token } from "../shared/types/authInterfaces";
import axios from "./axios";

export const registerRequest = (user: RegisterUser) =>
  axios.post(`/register`, user);

export const loginRequest = (user: LoginUser) => axios.post(`/login`, user);

export const verifyTokenRequest = (token: Token) =>
  axios.get(`/verify`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
