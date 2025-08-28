import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
  withCredentials: true, // needed if you’re using cookies/JWT
});

// Simple wrappers
export const get = (url) => api.get(url).then((res) => res.data);
export const post = (url, data) => api.post(url, data).then((res) => res.data);
export const put = (url, data) => api.put(url, data).then((res) => res.data);
export const del = (url) => api.delete(url).then((res) => res.data);

export default api;
