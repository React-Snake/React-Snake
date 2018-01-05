const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
var path = require('path');

const isProduction = process.env.NODE_ENV === 'production';
const productionPluginDefine = isProduction ? [
  new webpack.DefinePlugin({'process.env': {'NODE_ENV': JSON.stringify('production')}}),
  new webpack.DefinePlugin({
    'process.env.BROWSER': false
  }),
] : [];
const clientLoaders = isProduction ? productionPluginDefine.concat([
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false }, sourceMap: false }),
  new webpack.DefinePlugin({
    'process.env.BROWSER': true
  }),
]) : [];

module.exports = [
  {
    entry: ['babel-polyfill', './src/client/index.jsx'],
    output: {
      path: path.resolve(__dirname,'./src/public'),
      publicPath: path.resolve(__dirname,'./src/public'),
      filename: 'js/bundle.js'
    },
    plugins: clientLoaders.concat([
      new ExtractTextPlugin('css/styles.css', {
        allChunks: true
      })
    ]),
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.jsx$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('css!sass')
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('css-loader')
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx']
    }
  }
];
