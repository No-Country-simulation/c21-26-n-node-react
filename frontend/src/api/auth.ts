import { LoginUser, RegisterUser, Token } from "../types/authInterfaces";
import axios from "./axios";

//const API = "https://nc-c21-26-n-node-react.onrender.com/api/users";

export const registerRequest = (user: RegisterUser) =>
  axios.post(`/register`, user);

export const loginRequest = (user: LoginUser) => axios.post(`/login`, user);

export const verifyTokenRequest = (token: Token) =>
  axios.get(`/verify`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
