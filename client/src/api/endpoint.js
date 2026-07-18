import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://ai-cold-email-generator-rqy7.onrender.com/api/v1",
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = token;
  }

  return config;
});

export const post = (url, data) => axiosInstance.post(url, data);
export const get = (url) => axiosInstance.get(url);
export const del = (url)=>axiosInstance.delete(url);
