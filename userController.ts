import { userModel as User } from './userModel'
import { ERROR_NOT_FOUND, ERROR_NOT_REQUIRED_FIELDS, ERROR_ON_SERVER } from './errors';
import { IncomingMessage, ServerResponse } from 'node:http'
import { getPostData, checkUsersFields } from './utils';

interface IUser {
	id: string;
	name: string;
	age: number;
	hobbies: string[];
}

// interface INewUser extends IUser {
// }

export const getUsers = async (req: IncomingMessage, res: ServerResponse) => {
	try {
		const users = await new User().findAllUsers()

		res.writeHead(200, {"Content-Type": "application/json"});
		res.end(JSON.stringify(users));
	}
	catch (error) {
		if(error instanceof Error){
			console.error(error.message)
		}
		res
			.writeHead(ERROR_ON_SERVER.status, ERROR_ON_SERVER.content)
			.end(ERROR_ON_SERVER.message)
	}
}

export const getUser = async (req: IncomingMessage, res: ServerResponse, id: string) => {
	try {
		const user = await new User().findById(id)

		if(!user) {
			res.writeHead(ERROR_NOT_FOUND.status, ERROR_NOT_FOUND.content)
			res.end(ERROR_NOT_FOUND.message)
		} else {
			res.writeHead(200, {"Content-Type": "application/json"});
			res.end(JSON.stringify(user));
		}
	} catch (error) {
		if(error instanceof Error){
			console.error(error.message)
		}
		res
			.writeHead(ERROR_ON_SERVER.status, ERROR_ON_SERVER.content)
			.end(ERROR_ON_SERVER.message)
		
	}
}

export  const createUser = async (req: IncomingMessage, res: ServerResponse) => {
	try {
		const getBody: any = await getPostData(req)
		const body = JSON.parse(getBody)

		const { name, age, hobbies } = JSON.parse(getBody)

		// const isExistName = 'name' in body
		// const isExistAge = 'age' in body
		// const isExistHobbies = 'hobbies' in body
		// const isHobbieString = !(hobbies.find((elm: string | number | object) => typeof(elm) !== 'string'))
		
		// if ((isExistName && typeof(name) === 'string') && (isExistAge && typeof(age) === 'number') && (isExistHobbies && Array.isArray(hobbies) && isHobbieString)){
		if(checkUsersFields(body)){

			const user = {
				name,
				age,
				hobbies,
			}
			const newUser = await new User().addUser(user)
	
			res.writeHead(201, {"Content-type": "application/json"})
			return res.end(JSON.stringify(newUser))
		} else { 
			res
				.writeHead(ERROR_NOT_REQUIRED_FIELDS.status, ERROR_NOT_REQUIRED_FIELDS.content)
				.end(ERROR_NOT_REQUIRED_FIELDS.message)
		}

	} catch (error) {
		if(error instanceof Error){
			console.error(error.message)
		}
		res
			.writeHead(ERROR_ON_SERVER.status, ERROR_ON_SERVER.content)
			.end(ERROR_ON_SERVER.message)
	}
}

export const updateUser = async (req: IncomingMessage, res: ServerResponse, id: string) => {
	try {
		const user = await new User().findById(id)
		if(!user) {
			res.writeHead(ERROR_NOT_FOUND.status, ERROR_NOT_FOUND.content)
			res.end(ERROR_NOT_FOUND.message)
		} else {
			const body: string = await getPostData(req)
		
			const { name, age, hobbies } = JSON.parse(body)
		
			const userData: IUser = {
				id: user.id,
				name: name || user.name,
				age: age || user.age,
				hobbies: hobbies || user.hobbies,
			}

			if(checkUsersFields(userData)) {

				const updUser = await new User().updateUser(id, userData)
				res.writeHead(200, {"Content-type": "application/json"})
				res.end(JSON.stringify(updUser))
			} else {
				res
					.writeHead(ERROR_NOT_REQUIRED_FIELDS.status, ERROR_NOT_REQUIRED_FIELDS.content)
					.end(ERROR_NOT_REQUIRED_FIELDS.message)
			}

			}

		} catch (error) {
			if(error instanceof Error){
				console.error(error.message)
			}
			res
				.writeHead(ERROR_ON_SERVER.status, ERROR_ON_SERVER.content)
				.end(ERROR_ON_SERVER.message)
		}
}

export const deleteUser = async (req: IncomingMessage, res: ServerResponse, id: string) => {
	try {
		const user = await new User().findById(id)
	
		if(!user) {
			res.writeHead(ERROR_NOT_FOUND.status, ERROR_NOT_FOUND.content)
			res.end(ERROR_NOT_FOUND.message)
		} else {
			
			await new User().removeUser(id)

			res.writeHead(204, {"Content-type": "application/json"})
			res.end()
			}

		} catch (error) {
			if(error instanceof Error){
				console.error(error.message)
			}
			res
				.writeHead(ERROR_ON_SERVER.status, ERROR_ON_SERVER.content)
				.end(ERROR_ON_SERVER.message)
		}
}