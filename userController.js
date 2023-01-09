import { userModel as User } from './userModel.js'
import { getPostData } from './utils.js';

export const getUsers = async (req, res) => {
	try {
		const users = await new User().findAllUsers()

		res.writeHead(200, {"Content-Type": "application/json"});
		// res.write("test rest api")
		res.end(JSON.stringify(users));
	}
	catch (error) {
		console.error(error)
	}
}

export const getUser = async (req, res, id) => {
	try {
		const user = await new User().findById(id)

		if(!user) {
			res.writeHead(404, {"Content-Type": "application/json"})
			res.end({ message: `user with ID: ${id} is not found`})
		} else {
			res.writeHead(200, {"Content-Type": "application/json"});
			res.end(JSON.stringify(user));
		}
	} catch (error) {
		res.writeHead(404, {"Content-Type": "application/json"})
		res.end(JSON.stringify({ message: error}))
	}
}

export  const createUser = async (req, res) => {
	try {
		const body = await getPostData(req)
		
		const { name, age, hobbies } = JSON.parse(body)
		
		const user = {
			name,
			age,
			hobbies,
		}
		const newUser = await new User().addUser(user)

		res.writeHead(201, {"Content-type": "application/json"})
		return res.end(JSON.stringify(newUser))

	} catch (error) {
		console.error(error)
	}
}

export const updateUser = async (req, res, id) => {
	try {
		const user = await new User().findById(id)
	
		if(!user) {
			res.writeHead(404, {"Content-Type": "application/json"})
			res.end({ message: `user with ID: ${id} is not found`})
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
			res.writeHead(404, {"Content-Type": "application/json"})
			res.end(JSON.stringify({ message: error}))
		}
}

export const deleteUser = async (req, res, id) => {
	try {
		const user = await new User().findById(id)
	
		if(!user) {
			res.writeHead(404, {"Content-Type": "application/json"})
			res.end({ message: `user with ID: ${id} is not found`})
		} else {
			
			await new User().removeUser(id)

			res.writeHead(200, {"Content-type": "application/json"})
			res.end(JSON.stringify({message: `User ${id} deleted`}))
			}

		} catch (error) {
			console.error(error)
			// res.writeHead(404, {"Content-Type": "application/json"})
			// res.end(JSON.stringify({ message: error}))
		}
}