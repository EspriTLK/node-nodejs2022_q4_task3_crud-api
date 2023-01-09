import http from 'node:http'
import * as dotenv from 'dotenv'
import { getUsers, getUser, createUser, updateUser, deleteUser } from './userController.js';
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
		}
	} else if(req.url.match(/\/api\/users\/([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[4][0-9a-fA-F]{3}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})/)) {
		const id = req.url.split('/')[3]
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
		}
	} else {
		res.writeHead(400, {"Content-Type": "application/json"})
		res.end(JSON.stringify({ message: "Route not found"}));
	}
})

server.listen(PORT, () => {
	console.log(`server running on port ${PORT}`)
});