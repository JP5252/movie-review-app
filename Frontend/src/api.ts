import axios from "axios";
import { config } from "./config";
import { ACCESS_TOKEN } from "../src/constants";

// connect to the api
const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : config.apiURL,
});

api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem(ACCESS_TOKEN)
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

export default api