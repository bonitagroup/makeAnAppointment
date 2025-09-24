import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://192.168.1.7:5000/api";

const api = axios.create({
    baseURL: API_URL,
    timeout: 10000
});

api.interceptors.request.use((cfg) => {
    try {
        const t = localStorage.getItem("token");
        if (t) cfg.headers.Authorization = `Bearer ${t}`;
    } catch { }
    return cfg;
});

export default api;
