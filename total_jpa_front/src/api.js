import axios from "axios";

//다른 컴포넌트에서 사용할 공통 axios 설정하기
const api = axios.create(
  { baseURL : "http://localhost:8080/api"}
)

export default api;