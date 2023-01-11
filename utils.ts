import { IncomingMessage } from 'node:http'

interface IUser {
	id: string;
	name: string;
	age: number;
	hobbies: string[];
}

export const getPostData = (req: IncomingMessage): Promise<string> => {
	return new Promise((resolve, reject) => {
		try {
			let body = ''
			
			req.on('data', (chunk) => {
				body += chunk.toString()
			})

			req.on('end', () => {
				resolve(body)
			})
		} catch {

		}
	})
}

export const checkUsersFields = (obj: IUser) => {
	const isExistName = 'name' in obj
	const isExistAge = 'age' in obj
	const isExistHobbies = 'hobbies' in obj
	const isHobbieString = !(obj.hobbies.find((elm: string | number | object) => typeof(elm) !== 'string'))
	try {
		if((isExistName && typeof obj.name === 'string') && (isExistAge && typeof obj.age === 'number') && isExistHobbies && isHobbieString) {
			return true
		} else {
			return false
		}
	} catch (error) {
		return false
	}
}
