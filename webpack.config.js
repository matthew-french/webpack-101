const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');
const distPath  = path.resolve(__dirname, './dist');

module.exports = {
  entry: './src/app.js',
  output: {
    path: distPath,
    filename: 'app.bundle.js'
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
        title: 'project',
        hash: true,
        template: 'src/index.html'
    }),
    new ExtractTextPlugin({
      filename: 'style.css',
      disable: false,
      allChunks: true
    })
  ]
}
