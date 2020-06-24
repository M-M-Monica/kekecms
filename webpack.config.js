const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/app.jsx',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/app.js'
  },
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=5000&name=img/[name].[ext]' },
      { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader?limit=5000&name=resource/[name].[ext]' }, 
      { test: /\.jsx$/, use: 'babel-loader', exclude: /(node_modules)/ }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      favicon: './favicon.ico'
    })
  ],
  mode: 'development',
  devServer: {
    port: 8800,
    historyApiFallback: {
      index: '/dist/index.html'
    },
    proxy: {
      '/manage' : {
        target: 'http://localhost:3000',
        changeOrigin : true
      }
    }
  }
}