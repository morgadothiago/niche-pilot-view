import Axios from "axios";

export const axios = Axios.create({
  baseURL: process.env.VITE_PUBLIC_WEBHOOK_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
