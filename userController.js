import { userModel as User } from './userModel.js'
import { getPostData } from './utils.js';
import { ERROR_NOT_FOUND, ERROR_NOT_REQUIRED_FIELDS, ERROR_ON_SERVER } from './errors.js';

export const getUsers = async (req, res) => {
	try {
		const users = await new User().findAllUsers()

		res.writeHead(200, {"Content-Type": "application/json"});
		res.end(JSON.stringify(users));
	}
	catch (error) {
		console.error(error.message)
		res
			.writeHead(ERROR_ON_SERVER.status, ERROR_ON_SERVER.content)
			.end(ERROR_ON_SERVER.message)
	}
}

export const getUser = async (req, res, id) => {
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
		console.error(error.message)
		res
			.writeHead(ERROR_ON_SERVER.status, ERROR_ON_SERVER.content)
			.end(ERROR_ON_SERVER.message)
		
	}
}

export  const createUser = async (req, res) => {
	try {
		const getBody = await getPostData(req)
		// console.log(typeof(JSON.parse(body)))
		const body = JSON.parse(getBody)
		const { name, age, hobbies } = JSON.parse(getBody)
		if ((body.hasOwnProperty('name') && typeof(name) === 'string') && (body.hasOwnProperty('age') && typeof(age) === 'number') && (body.hasOwnProperty('hobbies') && Array.isArray(hobbies) && (!(hobbies.find((elm) => typeof(elm) !== 'string'))))){
			console.log(!(hobbies.find((elm) => typeof(elm) !== 'string')))
			console.log('all fields ok')
			const user = {
				name,
				age,
				hobbies,
			}
			const newUser = await new User().addUser(user)
	
			res.writeHead(201, {"Content-type": "application/json"})
			return res.end(JSON.stringify(newUser))
		} else { 
			console.log('no fields')
			res
				.writeHead(ERROR_NOT_REQUIRED_FIELDS.status, ERROR_NOT_REQUIRED_FIELDS.content)
				.end(ERROR_NOT_REQUIRED_FIELDS.message)
		}

	} catch (error) {
		console.error(error.message)
		res
			.writeHead(ERROR_ON_SERVER.status, ERROR_ON_SERVER.content)
			.end(ERROR_ON_SERVER.message)
	}
}

export const updateUser = async (req, res, id) => {
	try {
		const user = await new User().findById(id)
	
		if(!user) {
			res.writeHead(ERROR_NOT_FOUND.status, ERROR_NOT_FOUND.content)
			res.end(ERROR_NOT_FOUND.message)
		} else {
			const body = await getPostData(req)
		
			const { name, age, hobbies } = JSON.parse(body)
		
			const userData = {
				name: name || user.name,
				age: age || user.age,
				hobbies: hobbies || user.hobbies,
			}
			const updUser = await new User().updateUser(id, userData)

			res.writeHead(200, {"Content-type": "application/json"})
			return res.end(JSON.stringify(updUser))
			}

		} catch (error) {
			console.error(error.message)
			res
				.writeHead(ERROR_ON_SERVER.status, ERROR_ON_SERVER.content)
				.end(ERROR_ON_SERVER.message)
		}
}

export const deleteUser = async (req, res, id) => {
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
			console.error(error.message)
			res
				.writeHead(ERROR_ON_SERVER.status, ERROR_ON_SERVER.content)
				.end(ERROR_ON_SERVER.message)
		}
}