import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.reviewbadhao.com/api",
  withCredentials: true, // IMPORTANT for cookies
});

export default instance;