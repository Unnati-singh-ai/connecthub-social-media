import axios from "axios";

const api = axios.create({
  baseURL: "https://connecthub-backend-dulc.onrender.com/api"
});

export default api;