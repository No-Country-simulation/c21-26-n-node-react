import axios from "axios";

const api_url = import.meta.env.VITE_API_URL;

const instance = axios.create({
  baseURL: "http://localhost:3000/api/users",
  withCredentials: true,
});

export default instance;
