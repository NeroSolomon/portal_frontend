const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const updateIndexHTML = require('./tools/update-index-html.js');

const getConfig = env => {
  const isProd = 'prod' == env;
  const isTest = 'test' == env;
  const isDev = !isProd && !isTest;

  let entry = {
    app: './src/app.jsx'
  }

  let plugins = [
    // 将env注入，使得其它模块可以使用env
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    })
  ]

  if (isDev) {
    // development
    const tmp = { ...entry };
    entry = ['webpack-hot-middleware/client?reload=true'];
    Object.keys(tmp).forEach(key => {
      const item = tmp[key];
      if ('object' == typeof item && 'number' == typeof item.length) {
        entry = entry.concat(item);
      } else {
        entry.push(item);
      }
    });

    plugins = plugins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new ExtractTextPlugin({
        filename: "bundle.css"
      })
    ]);

  } else {
    plugins = plugins.concat([
      new HtmlWebpackPlugin({
        template: './src/index.html',
        favicon: './src/favicon.ico'
      }),
      new updateIndexHTML(),
      new ExtractTextPlugin({
        filename: "css/[name]-[hash].css",
        allChunks: true
      }),
      // 提出公共模块
      new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
        filename: 'js/base.js'
      })
    ])
  }

  return {
    entry,
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isDev ? 'bundle.js' : 'js/[name].bundle.[hash].js',
      publicPath: '/'
    },
    resolve: {
      // 设置快捷目录
      alias: {
        page: path.resolve(__dirname, 'src/page'),
        component: path.resolve(__dirname, 'src/component'),
        util: path.resolve(__dirname, 'src/util'),
        service: path.resolve(__dirname, 'src/service'),
        actions: path.resolve(__dirname, 'src/actions')
      }
    },
    plugins,
    module: {
      rules: [
        {
          test: /\.jsx$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['env', 'react']
            }
          }
        },
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['env']
            }
          }
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader"
          })
        },
        {
          test: /\.(sass|scss)$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: ["css-loader", "sass-loader"]
          })
        },
        {
          test: /\.(jpg|png|gif|svg)$/,
          use: {
            loader: "url-loader",
            options: {
              limit: 8192,
              name: 'images/[name].[ext]'
            }
          }
        },
        {
          test: /\.(eot|ttf|woff|woff2)$/,
          use: {
            loader: "url-loader",
            options: {
              limit: 8192,
              name: 'font/[name].[ext]'
            }
          }
        }
      ]
    },
    performance: {
      hints: false
    }
  }
}

module.exports = getConfig;