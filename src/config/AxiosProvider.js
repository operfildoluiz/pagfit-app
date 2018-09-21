import axios from "axios";
import configApp from "./app";

export const server = axios.create({
  baseURL: configApp.endpoint.api
});