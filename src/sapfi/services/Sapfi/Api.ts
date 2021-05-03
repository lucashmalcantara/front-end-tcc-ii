import axios from "axios";

const api = axios.create({
  baseURL: "https://sapfiapi.azurewebsites.net",
});

export default api;