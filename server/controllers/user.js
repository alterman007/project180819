const User = require('../models/user');

exports.signin = (req, res) => {
  const { name, password } = req.body;
  User.findOne({ name: name }, (err, user) => {
    if (err) {
      res.json({ success: false, message: err });
      return;
    }
    if (!user) {
      res.json({ success: false, message: 'User does not exist' });
      return;
    }
    user.comparePassword(password, (err, isMatch) => {
      if (err) {
        res.json({ success: false, message: err });
        return;
      }
      if (!isMatch) {
        res.json({ success: false, message: 'Password mistake' });
        return;
      }
      req.session.user = user;
      res.json({
        success: true,
        message: {
          user: user.name,
        },
      });
    });
  });
};

exports.signup = (req, res) => {
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      res.json({ success: false, message: err });
      return;
    }
    res.json({ success: true });
    // res.redirect('/');
  });
};

exports.logout = (req, res) => {
  delete req.session.user;
  res.json({ success: true });
};

exports.list = (req, res) => {
  User.fetch((err, users) => {
    if (err) {
      res.json({ errorCode: 1000 });
      return;
    }
    res.json(users);
  });
};

exports.update = (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.json({ errorCode: 1000 });
  }
  User.findById(id, (err, oldScreen) => {
    if (err) {
      res.json({ errorCode: 1000 });
      return;
    }
    res.json(oldScreen);
  });
};
