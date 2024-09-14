import axios from 'axios'
import { baseUrl } from '../index'

export const user = {
	postUser: async (userData, params) =>
		axios.post(`${baseUrl}/base/registration`, userData, params),

	postLoginUser: async (userData, params) =>
		axios.post(`${baseUrl}/base/login`, userData, params),

	getCurrentUser: async params =>
		axios.get(`${baseUrl}/base/get-current-user`, params).then(res => res.data),

	checkForm: async (userData, params) =>
		axios.post(`${baseUrl}/base/check-form`, userData, params),
}

export const levels = {
	getLevel: async (idLevel, params) =>
		axios
			.get(`${baseUrl}/base/levels/${idLevel}`, params)
			.then(res => res.data),

	getLevels: async params =>
		axios.get(`${baseUrl}/base/levels`, params).then(res => res.data),

	postCurrentLevel: async (data, params) =>
		axios.post(`${baseUrl}/base/points`, data, params),

	postAddLevel: async (data, params) =>
		axios.post(`${baseUrl}/base/add-level`, data, params),
}
