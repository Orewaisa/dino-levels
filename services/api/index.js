import axios from 'axios'
import { baseUrl } from '../index'

export const user = {
	postUser: async (userData, params) =>
		axios.post(`${baseUrl}/base/registration`, userData, params),

	getUsers: async params =>
		axios.get(`${baseUrl}/base/getUsers`, params).then(res => res.data),

}

export const levels = {
	getLevel: async (idLevel, params) =>
		axios.get(`${baseUrl}/base/levels/${idLevel}`, params).then(res => res.data),
	
	getLevels: async (params) =>
		axios.get(`${baseUrl}/base/levels`, params).then(res => res.data),
	
	postCurrentLevel: async (data, params) =>
		axios.post(`${baseUrl}/base/points`, data, params),
}
