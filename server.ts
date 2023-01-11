import http from 'node:http'
import * as dotenv from 'dotenv'
import { validate as uuidValidate } from 'uuid'
import { getUsers, getUser, createUser, updateUser, deleteUser } from './userController';
import { ERROR_NOT_VALID_URL, ERROR_NOT_VALID_ID } from './errors'
dotenv.config()

const PORT = process.env.PORT || 5555;

const server = http.createServer(async (req, res) => {
	if (req.url === '/api/users') {
		switch (req.method) {
			case 'GET':
				getUsers(req, res)
				break
			case 'POST':
				createUser(req, res)
				break
			default:
				res
					.writeHead(404, {"Content-Type": 'application/json'})
					.end()
				break

		}
		//regEXP [0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[4][0-9a-fA-F]{3}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}
	} else if(req.url !== undefined && req.url.match(/\/api\/users\/[0-9a-fA-F]+/) && req.url.split('/').length === 4) {
		const id = req.url.split('/')[3]
		if(uuidValidate(id)){
			switch (req.method) {
				case 'GET':
					getUser(req, res, id)
					break
				case 'PUT':
					updateUser(req, res, id)
					break
				case 'DELETE':
					deleteUser(req, res, id)
					break
				default:
					res
						.writeHead(404, {"Content-Type": 'application/json'})
						.end()
					break
			}
		} else {
			res.writeHead(ERROR_NOT_VALID_ID.status, ERROR_NOT_VALID_ID.content )
			res.end(`${id} ${ERROR_NOT_VALID_ID.message}`)
		}
	} else {
		res.writeHead(ERROR_NOT_VALID_URL.status, ERROR_NOT_VALID_URL.content)
		res.end(ERROR_NOT_VALID_URL.message);
	}
})

server.listen(PORT, () => {
	console.log(`server running on port ${PORT}`)
});