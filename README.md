# node-nodejs2022_q4_task3_crud-api

This app is learning project for [RSSCHOOL nodejs course](https://docs.rs.school/#/nodejs-course?id=rs-school-nodejs-course) 2022q4, [Task 3](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/assignment.md)

## How to install

clone repository
```
git clone 
```

rename file `.env.example` to `.env.`

install packages 
```
npm install
```

run in dev mode 
```
npm run start:dev
```
run in prod mode 
```
npm run start:dev
```

## How to use api

Implemented endpoint `api/users`

available methods:

#### `GET api/users` - show all users
#### `GET api/users/${userId}` - show user by Id
#### `POST api/users` - create new user, reuired fields: `username`: string; `age`: number; `hobbies`: array of strings or empty array
#### `PUT api/users/${userId}` - update existing user
#### `DELETE api/users/${userId}` - delete existing user