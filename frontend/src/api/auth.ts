import { LoginUser, RegisterUser, Token } from "../shared/types/authInterfaces";
import axios from "./axios";

export const registerRequest = (user: RegisterUser) =>
  axios.post(`/auth/register`, user);

export const loginRequest = (user: LoginUser) =>
  axios.post(`/auth/login`, user);

export const verifyTokenRequest = (token: string) =>
  axios.get("/users/verify", {
    headers: {
      Authorization: `Bearer ${token}`, // Enviar token en el header
    },
  });

export const resetPassword = (email: string) => {
  axios.post("/users/forgot-password", { email });
};
