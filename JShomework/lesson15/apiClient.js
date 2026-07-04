import axios from "axios";
import jsonData from "./env.json";

export const api = axios.create({
  baseURL: jsonData.baseUrl,
  auth: jsonData.basicAuth,
  validateStatus: () => true,
});
