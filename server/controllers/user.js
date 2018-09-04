const User = require('../models/user');

exports.signin = (req, res) => {
  if (req.session.user) {
    return res.json({
      success: true,
      message: {
        username: req.session.user.username,
      },
    });
  }

  const { username, password } = req.body;
  if (!username) {
    return res.json({ success: false, message: 'error args' });
  }

  User.findOne({ username }, (err, user) => {
    if (err) {
      res.json({ success: false, message: '未知错误', err });
      return;
    }
    if (!user) {
      res.json({ success: false, message: '用户不存在' });
      return;
    }
    user.comparePassword(password, (err, isMatch) => {
      if (err) {
        res.json({ success: false, message: '未知错误', err });
        return;
      }
      if (!isMatch) {
        res.json({ success: false, message: '密码错误' });
        return;
      }
      req.session.user = user;
      res.json({
        success: true,
        message: {
          username: user.username,
        },
      });
    });
  });
};

exports.record = (req, res) => {
  if (req.session.user) {
    return res.json({
      success: true,
      message: {
        username: req.session.user.username,
      },
    });
  }
  return res.json({
    success: false,
  });
};

exports.signup = (req, res) => {
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      const message = err.message.indexOf('duplicate key error collection') > -1
        ? '用户名已存在'
        : '未知错误';
      res.json({ success: false, message, err });
      return;
    }
    req.session.user = user;
    res.json({ success: true, message: user });
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
