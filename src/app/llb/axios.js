import axios from "axios";

const instance = axios.create({
  baseURL: "https://qrapi.vocalheart.com/api",
  withCredentials: true, // IMPORTANT for cookies
});

export default instance;