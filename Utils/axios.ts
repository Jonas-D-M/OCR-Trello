import axios from "axios";
import Environment from "../config/environment";
import localStorage from "./localStorage";

const AxiosInstance = axios.create({
  baseURL: " https://api.trello.com/1",
});

AxiosInstance.interceptors.request.use(async (config) => {
  config.params["token"] = await localStorage.read("@Token");
  config.params["key"] = Environment["TRELLO_API_KEY"];
  return config;
});

export default AxiosInstance;
