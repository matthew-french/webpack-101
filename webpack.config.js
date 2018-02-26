const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');
const distPath  = path.resolve(__dirname, './dist');

module.exports = {
  entry: {
    index: './src/index.js',
    old: './src/old.js',
    default: './src/default.js',
  },
  output: {
    path: distPath,
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
          publicPath: 'dist'
        })
      }
    ]
  },
  devServer: {
    contentBase: distPath,
    compress: true,
    port: 9000,
    stats: 'errors-only',
    open: true
  },
  plugins: [
    new HtmlWebpackPlugin({
        title: 'Index',
        hash: true,
        filename: 'index.html',
        template: './src/index.html'
    }),
    new HtmlWebpackPlugin({
        title: 'Old',
        hash: true,
        filename: 'old.html',
        template: './src/old.html'
    }),
    new HtmlWebpackPlugin({
        title: 'Default Message Pack Template',
        hash: true,
        filename: 'default.html',
        template: './src/default.html'
    }),
    new ExtractTextPlugin({
      filename: 'default.css',
      disable: false,
      allChunks: true
    })
  ]
}
