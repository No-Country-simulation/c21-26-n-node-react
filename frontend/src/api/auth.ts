import { loginRequest } from "./auth";
import axios from "./axios";

const API = "http://localhost:3000/api/users";

//const API = "https://nc-c21-26-n-node-react.onrender.com/api/users";

export const registerRequest = (user) => axios.post(`/register`, user);

export const loginRequest = (user) => axios.post(`/login`, user);

export const verifyTokenRequest = (token) =>
  axios.get(`/verify`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
