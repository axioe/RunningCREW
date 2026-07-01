import axios from "axios";
import useAuthStore from "../components/common/useAuthStore";

export const api = axios.create({
  baseURL: "/api",
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