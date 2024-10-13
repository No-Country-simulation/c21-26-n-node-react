import axios from "axios";

const api_url = import.meta.env.API_URL

const instance = axios.create({
  baseURL: api_url,
  withCredentials: true,
});

export default instance;
