import axios from "axios";

const api_url = import.meta.env.VITE_API_URL;
//https://nc-c21-26-n-node-react.onrender.com/api/users
const instance = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export default instance;
