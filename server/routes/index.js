const mongoose = require('mongoose');
const mongoConf = require('../config/mongodb');
const screenRoute = require('./screen');
const userRoute = require('./user');

mongoose.connect(
  `mongodb://${mongoConf.username}:${mongoConf.password}@${mongoConf.host}:${mongoConf.port}/${mongoConf.database}`,
  { useNewUrlParser: true },
  (err) => { console.log('err', err); }
);

module.exports = function (app) {
  app.use('/screen', screenRoute);
  app.use('/user', userRoute);
};
