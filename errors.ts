export const ERROR_NOT_FOUND = { 
	status: 404, 
	message: JSON.stringify({message: "user not found"}), 
	content: {"Content-Type": "application/json"}
}

export const ERROR_NOT_VALID_ID = {
	status: 400, 
	message: JSON.stringify({message: "uuid is not valid"}),
	content: {"Content-Type": "application/json"}
}

export const ERROR_NOT_REQUIRED_FIELDS = {
	status: 400, 
	message: JSON.stringify({message: "no required fields or incorrect type of data"}),
	content: {"Content-Type": "application/json"}
}

export const ERROR_NOT_VALID_URL = {
	status: 404, 
	message: JSON.stringify({message: "route not found"}),
	content: {"Content-Type": "application/json"}
}

export const ERROR_ON_SERVER = {
	status: 500,
	message: JSON.stringify({message: "server error"}),
	content: {"Content-Type": "application/json"}
}