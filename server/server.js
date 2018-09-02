const fs = require('fs');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo')(expressSession);
const serveFavicon = require('serve-favicon');
const ReactSSR = require('react-dom/server');
const routes = require('./routes');
const app = express();

const isDev = process.env.NODE_ENV === 'development';

app.use(serveFavicon(path.join(__dirname, '../favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({
  secret: 'alterman',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
  }),
}));

routes(app);

if (isDev) {
  const devStatic = require('./util/dev-static');
  devStatic(app);
} else {
  const template = fs.readFileSync(
    path.join(__dirname, '../dist/index.html'),
    'utf-8',
  );
  const serverEntry = require('../dist/server-entry').default;
  app.use('/public', express.static(path.join(__dirname, '../dist')));
  app.get('*', (req, res) => {
    const context = {};
    const appString = ReactSSR.renderToString(serverEntry(req.url, context));
    console.log(context);
    if (context.url) {
      res.redirect(301, context.url);
      return;
    }
    const htmlContent = template.replace('<!-- app-content -->', appString);
    res.send(htmlContent);
  });
}

app.listen(3333, () => {
  console.log('server is listening on http://127.0.0.1:3333');
});
