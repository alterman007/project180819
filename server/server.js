const fs = require('fs');
const path = require('path');
const express = require('express');
const ReactSSR = require('react-dom/server');
const serveFavicon = require('serve-favicon');
const app = express();

const isDev = process.env.NODE_ENV === 'development';

app.use(serveFavicon(path.join(__dirname, '../favicon.ico')));

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
    const appString = ReactSSR.renderToString(serverEntry);
    const htmlContent = template.replace('<!-- app-content -->', appString);
    res.send(htmlContent);
  });
}

app.listen(3333, () => {
  console.log('server is listening on http://localhost:3333');
});
