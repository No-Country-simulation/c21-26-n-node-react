import axios from "axios";

//const API = "https://nc-c21-26-n-node-react.onrender.com/api/users";
//const API = "";

const instance = axios.create({
  baseURL: "http://localhost:3000/api/users",
  withCredentials: true,
});

export default instance;
