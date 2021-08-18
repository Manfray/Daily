// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')
const HelloWorldPlugin  = require('./plugins/webpack-first-plugin.js')
module.exports = {
  mode: 'production',
  entry: {
    index: './src/index.js'
  },
  output: {
    filename: '[name][hash].js',
    path: path.resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: path.resolve(__dirname, 'loader/drop-console.js')
      }
    ]
  },
  plugins: [
    new HelloWorldPlugin({ options: true })
  ]
}