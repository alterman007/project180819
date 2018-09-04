const express = require('express');
const userController = require('../controllers/user');

const userRoute = express();

userRoute.post('/signin', userController.signin);
userRoute.post('/signup', userController.signup);
userRoute.get('/logout', userController.logout);
userRoute.get('/record', userController.record);
userRoute.post('/update/:id', userController.update);

module.exports = userRoute;
