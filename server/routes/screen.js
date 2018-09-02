const express = require('express');
const screenController = require('../controllers/screen');

const screenRoute = express();

screenRoute.get('/list', screenController.list);
screenRoute.get('/detail/:id', screenController.detail);
screenRoute.post('/update/:id', screenController.update);
screenRoute.post('/new', screenController.new);
screenRoute.delete('/', screenController.delete);

module.exports = screenRoute;
