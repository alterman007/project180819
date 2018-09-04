const path = require('path');
const axios = require('axios');
const webpack = require('webpack');
const MemoryFs = require('memory-fs');
const ReactDOMServer = require('react-dom/server');
const proxy = require('http-proxy-middleware');
const serverConfig = require('../../build/webpack.config.server');

const getHTMLTemplate = () => {
  return new Promise((resolve, reject) => {
    axios.get('http://127.0.0.1:8888/public/index.html')
      .then((res) => {
        resolve(res.data);
      })
      .then(reject);
  });
};

const mfs = new MemoryFs();
const serverCompiler = webpack(serverConfig);
const Module = module.constructor;

let serverBundle;
let initServerBundleResolve;
serverCompiler.outputFileSystem = mfs;

const initServerBundle = new Promise((resolve) => {
  initServerBundleResolve = resolve;
});
serverCompiler.watch({}, (err, status) => {
  if (err) {
    console.log(err);
  }
  const statusInfo = status.toJson();
  statusInfo.errors.forEach(console.error);
  statusInfo.warnings.forEach(console.warn);

  const { path: outputPath, filename: outputFilename } = serverConfig.output;
  const bundlePath = path.join(outputPath, outputFilename);
  const bundle = mfs.readFileSync(bundlePath, 'utf-8');
  const m = new Module();
  try {
    m._compile(bundle, 'server-entry.js');
  } catch (err) {
    // TODO
    console.log(err);
  }
  if (!serverBundle) {
    serverBundle = m.exports.default;
    initServerBundleResolve(true);
    console.log('server bundle done');
  } else {
    serverBundle = m.exports.default;
  }
});

module.exports = (app) => {
  app.use('/public', proxy({
    target: 'http://127.0.0.1:8888',
  }));
  app.get('*', (req, res) => {
    Promise.all([getHTMLTemplate(), initServerBundle]).then(([template]) => {
      const context = {};
      const appString = ReactDOMServer.renderToString(serverBundle(req.url, context));
      if (context.url) {
        res.redirect(301, context.url);
        return;
      }
      const htmlContent = template.replace('<!-- app-content -->', appString);
      res.send(htmlContent);
    });
  });
};
