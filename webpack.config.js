const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');

const PATHS = {
  pug: path.resolve(__dirname, './src'),
  output: path.resolve(__dirname, './dist'),
}

const pugTemplate = (name) => {
  return new HtmlWebpackPlugin({
      title: name,
      hash: true,
      filename: name + '.html',
      template: PATHS.pug + '/' + name + '.pug'
  });
}

module.exports = {
  entry: {
    index: './src/index.js',
    default: './src/default/default.scss',
    mosaic: './src/mosaic/mosaic.scss',
    thought: './src/thought/thought.scss',
    spin: './src/spin/spin.scss',
    shake: './src/shake/shake.scss'
  },
  output: {
    path: PATHS.output,
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
          publicPath: 'dist/styles'
        })
      },
      {
        test: /\.pug$/,
        loaders: [{
          loader: 'html-loader'
        }, {
          loader: 'pug-html-loader',
            options: {
              data: {
                message: 'This is a test message',
                language: 'en',
                avatar: '',
                noAvatar: 'https://s3-eu-west-1.amazonaws.com/bots-palringo-com/bots/mimic_bot/noavatar.jpeg',
                css: '',
                uniqueId: '12345'
              }
            }
        }]
      }
    ]
  },
  devServer: {
    contentBase: PATHS.output,
    compress: true,
    port: 9000,
    stats: 'errors-only',
    open: true
  },
  plugins: [
    pugTemplate('index'),
    new ExtractTextPlugin({
      filename: '[name].css'
    })
  ]
}
