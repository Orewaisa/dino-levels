import { defineStore } from 'pinia'

export const useChecksAccount = defineStore({
	id: 'checksAccount',
	state: () => ({
		checkAccount: false,
		checkAdminToken: false,
		adminToken: 'adminTokenAdmin',
	}),
	actions: {
		reloadedCheckAccount(newMeaning) {
			this.checkAccount = newMeaning
			console.log(this.newMeaning)
		},

		reloadedVariableAdminToken(newMeaning) {
			this.checkAdminToken = newMeaning
		},
	},
})
