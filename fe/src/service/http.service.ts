import axios from "axios";
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BE_URL,
});

axiosInstance.interceptors.response.use((response) => response);
function useHttp() {
  return axiosInstance;
}

export { useHttp };
