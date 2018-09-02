const { Schema } = require('mongoose');
const bcrypt = require('bcrypt');
const { USER_PASSWORD_SALT_ROUNDS } = require('../constants');

const userSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  password: String,
  meta: {
    createAt: {
      type: Date,
      default: Date.now(),
    },
    updateAt: {
      type: Date,
      default: Date.now(),
    },
  },
});

userSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createAt = Date.now();
  }
  this.meta.updateAt = Date.now();
  bcrypt.hash(this.password, USER_PASSWORD_SALT_ROUNDS, (err, hash) => {
    if (err) {
      next(err);
      return;
    }
    this.password = hash;
    next();
  });
});

userSchema.statics = {
  fetch: function (cb) {
    return this
      .find({})
      .sort('meta.updateAt')
      .exec(cb);
  },
  findById: function (_id, cb) {
    return this
      .findOne({ _id })
      .sort('meta.updateAt')
      .exec(cb);
  },
};

userSchema.methods = {
  comparePassword: function (password, cb) {
    bcrypt.compare(password, this.password, cb);
  },
};

module.exports = userSchema;
