import axios from "axios";

const api_url = import.meta.env.VITE_API_URL;

const instance = axios.create({
  baseURL: "https://nc-c21-26-n-node-react.onrender.com/api/users",
  withCredentials: true,
});

export default instance;
