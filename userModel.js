import { v4 as uuidv4 } from 'uuid'

let DB = []

export class userModel {
	async findAllUsers() {
		return new Promise((resolve, reject) => resolve(DB))
	}

	async findById(id) {
		return new Promise((resolve, reject) => {
			const user = DB.find((u) => u.id === id)
			resolve(user)
		})
	}

	async addUser(user) {
		return new Promise((resolve, reject) => {

			const newUser = {
				id: uuidv4(),
				...user,
			}
			DB.push(newUser)
			resolve(newUser)
		})
	}

	async updateUser(id, user) {
		return new Promise((resolve, reject) => {
			const index = DB.findIndex((u) => u.id === id)
			DB[index] = {id, ...user}
			resolve(DB[index])
		})
	}

	async removeUser(id) {
		return new Promise((resolve, reject) => {
			DB = DB.filter((u) => u.id !== id)
			resolve()
		})
	}
}