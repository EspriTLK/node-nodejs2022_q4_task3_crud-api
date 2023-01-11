import { v4 as uuidv4 } from 'uuid'

interface IUser {
	age: number;
	name: string;
	hobbies: string[];
}

interface INewUser extends IUser {
	id: string
}

let DB: INewUser[] = []


export class userModel {
	async findAllUsers() {
		return new Promise((resolve, reject) => resolve(DB))
	}

	async findById(id: string): Promise<INewUser> {
		return new Promise((resolve: any, reject: any) => {
			const user = DB.find((u) => u.id === id)
			resolve(user)
		})
	}

	async addUser(user: IUser) {
		return new Promise((resolve, reject) => {

			const newUser: INewUser = {
				id: uuidv4(),
				...user,
			}
			DB.push(newUser)
			resolve(newUser)
		})
	}

	async updateUser(id: string, user: IUser) {
		return new Promise((resolve, reject) => {
			const index = DB.findIndex((u) => u.id === id)
			DB[index] = {id, ...user}
			resolve(DB[index])
		})
	}

	async removeUser(id: string) {
		return new Promise((resolve: (value?: any) => void, reject): void => {
			DB = DB.filter((u) => u.id !== id)
			resolve()
		})
	}
}