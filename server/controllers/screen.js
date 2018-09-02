const Screen = require('../models/screen');

exports.list = (req, res) => {
  Screen.fetch((err, screens) => {
    if (err) {
      res.json({ errorCode: 1000 });
      return;
    }
    res.json(screens);
  });
};

exports.detail = (req, res) => {
  const id = req.params.id;
  Screen.findById(id, (err, screen) => {
    if (err) {
      res.json({ errorCode: 1000 });
      return;
    }
    res.json(screen);
  });
};

exports.update = (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.json({ errorCode: 1000 });
  }
  Screen.findById(id, (err, oldScreen) => {
    if (err) {
      res.json({ errorCode: 1000 });
      return;
    }
    res.json(oldScreen);
  });
};

exports.new = (req, res) => {
  const screen = req.body;
  const id = screen._id;
  // console.log(req.body);
  if (id) {
    Screen.findById(id, (err, oldScreen) => {
      if (err) {
        res.json({ errorCode: 1000, errorMessage: err, meta: 'findById' });
        return;
      }
      oldScreen.save((err, updatedScreen) => {
        if (err) {
          res.json({ errorCode: 1000 });
          return;
        }
        res.redirect('/screen' + updatedScreen._id);
      });
    });
  } else {
    const newScreen = new Screen(screen);
    newScreen.save((err, updatedScreen) => {
      // console.log({ err, updatedScreen });
      if (err) {
        res.json({ errorCode: 1000, errorMessage: err, meta: 'save' });
        return;
      }
      res.json(updatedScreen);
      // res.redirect('/screen' + updatedScreen._id);
    });
  }
};

exports.delete = (req, res) => {
  const { id: _id } = req.body;
  console.log('req.body remove', req.body);
  if (_id) {
    Screen.remove({ _id }, (err, screen) => {
      console.log({ err, screen });
      if (err) {
        res.json({ errorCode: 1000, errorMessage: err, meta: 'remove' });
        return;
      }
      res.json({ success: true, screen });
    });
  } else {
    res.json({ success: false, message: 'not matched screen' });
  }
};
