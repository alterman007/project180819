const { Schema } = require('mongoose');

const screenSchema = new Schema({
  name: String,
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

screenSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createAt = Date.now();
  }
  this.meta.updateAt = Date.now();
  next();
});

screenSchema.statics = {
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

module.exports = screenSchema;
