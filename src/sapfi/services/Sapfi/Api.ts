import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.15.10:49158",
});

export default api;