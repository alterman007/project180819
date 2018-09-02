const mongoose = require('mongoose');
const screenSchema = require('../schemas/screen');

const Screen = mongoose.model('Screen', screenSchema);

module.exports = Screen;
