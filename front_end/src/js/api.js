import axios from "axios";
import useAuthStore from "../components/common/useAuthStore";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

api.interceptors.request.use((config) => {
   const token = useAuthStore.getState().accessToken;
   
    //console.log("token : " + token);

  if (token) {
    config.headers.Authorization = token; 
  }

  return config;
});

export default api;