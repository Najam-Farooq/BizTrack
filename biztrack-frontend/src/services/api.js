import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8001", // FastAPI backend
});

export default api;
