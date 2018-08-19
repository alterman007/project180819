const path = require('path');
const axios = require('axios');
const webpack = require('webpack');
const MemoryFs = require('memory-fs');
const ReactDOMServer = require('react-dom/server');
const proxy = require('http-proxy-middleware');
const serverConfig = require('../../build/webpack.config.server');

const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:8888/public/index.html')
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
serverCompiler.outputFileSystem = mfs;
serverCompiler.watch({}, (err, status) => {
  if (err) {
    throw err;
  }
  const statusInfo = status.toJson();
  statusInfo.errors.forEach(console.error);
  statusInfo.warnings.forEach(console.warn);

  const { path: outputPath, filename: outputFilename } = serverConfig.output;
  const bundlePath = path.join(outputPath, outputFilename);
  const bundle = mfs.readFileSync(bundlePath, 'utf-8');
  const m = new Module();
  m._compile(bundle, 'server-entry.js');
  serverBundle = m.exports.default;
});

module.exports = (app) => {
  app.use('/public', proxy({
    target: 'http://localhost:8888',
  }));
  app.get('*', (req, res) => {
    getTemplate().then((template) => {
      const appString = ReactDOMServer.renderToString(serverBundle);
      const htmlContent = template.replace('<!-- app-content -->', appString);
      res.send(htmlContent);
    });
  });
};
