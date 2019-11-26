const webpack = require('webpack');
const browserSync = require("browser-sync").create();
const webpackDevMiddleware = require('webpack-dev-middleware');
const  webpackHotMiddleware = require('webpack-hot-middleware');
const getConfig = require('./../webpack.config.fn.js');

const config = getConfig();
const compiler = webpack(config);

browserSync.init({
  port: 3000,
  ui: {
    port: 3001
  },
  server: {
    baseDir: 'src',
    middleware: [
      // watch file Change, just for development
      webpackDevMiddleware(compiler, {
        // required
        publicPath: config.output.publicPath,

        // pretty colored output
        stats: { colors: true },

        // only show error when compile
        logLevel: 'error'
      }),

      // use it with webpack-dev-middleware
      webpackHotMiddleware(compiler)
    ]
  },
  // no need to watch '*.js' here, webpack will take care of it for us,
  // including full page reloads if HMR won't work
  files: ['src/*.html']
})