import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3333",
  headers: { "Access-Control-Allow-Origin": true },
});

export default api;