import { FieldValues } from "react-hook-form";
import { LoginUser, RegisterUser } from "../shared/types/authInterfaces";
import axios from "./axios";

export const registerRequest = (user: RegisterUser) =>
  axios.post(`/auth/register`, user);

export const loginRequest = (user: LoginUser) =>
  axios.post(`/auth/login`, user);

export const verifyTokenRequest = (token: string) =>
  axios.get("/users/verify", {
    headers: {
      Authorization: `Bearer ${token}`
    },
  });

export const resetPassword = (values: FieldValues) => {
  const email = values.email;
  axios.post("/users/forgot-password", { email });
};
