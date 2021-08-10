const express = require('express');
const userRoute = express.Router();
const { userController }  = require('../beans/index')

userRoute.post('/addUser',userController.importUsers)
userRoute.get('/getUser',userController.fetchUsers)

module.exports = userRoute;