import axios from "axios";

export const api = axios.create({
  baseURL: "https://de1.api.radio-browser.info",
  timeout: 10000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
