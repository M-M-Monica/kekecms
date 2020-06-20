const path = require('path')
const webpack =require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: {
    app: './src/app.jsx'
  },
  output: {
    filename: 'js/[name].js',
    path: path.join(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.(sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      { test: /\.(png|gif|bmp|jpg)$/, use: 'url-loader?limit=5000&name=images/[name].[ext]' },
      { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader?limit=5000&name=resource/[name].[ext]' },
      { test: /\.jsx$/, use: 'babel-loader', exclude: /(node_modules)/ }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      favicon: './favicon.ico',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeAttributeQuotes: true
      }
    }),
    new MiniCssExtractPlugin({ filename: 'css/styles.css' })
  ],
  optimization: {
    minimizer: [new UglifyJsPlugin(), new OptimizeCSSAssetsPlugin({})],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          name: 'vendors',
          test: /(react|react-dom|react-router-dom|antd|axios)/,
          chunks: 'all',
          priority: -10
        }
      }
    }
  },
  mode: 'production'
}