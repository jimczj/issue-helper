const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = require('./config.js')

const resolveApp = relativePath => path.join(__dirname, relativePath)

const babelLoader = require.resolve('babel-loader')
const tsLoader = {
  loader: require.resolve('ts-loader'),
  options: {
    onlyCompileBundledFiles: true
  }
}
const fileLoader = require.resolve('file-loader')
const styleLoader = require.resolve('style-loader')
const cssLoader = {
  loader: require.resolve('css-loader'),
  options: {
    sourceMap: true
  }
}
const sassLoader = {
  loader: require.resolve('sass-loader'),
  options: {
    sourceMap: true
  }
}
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  title: config.title,
  logo: config.logo,
  inject: false,
  template: resolveApp('./src/index.html')
})

module.exports = {
  mode: 'development',
  entry: {
    index: resolveApp('./src/index.js'),
    'es5-polyfill': 'es5-polyfill'
  },
  output: {
    path: resolveApp('./dist'),
    filename: 'js/[name].js',
    publicPath: '/'
  },
  devtool: 'source-map',
  resolve: {
    symlinks: true,
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: babelLoader
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [babelLoader, tsLoader]
      },
      {
        test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
        loader: fileLoader
      },
      {
        test: /\.s?css$/,
        use: [styleLoader, cssLoader, sassLoader]
      }
    ]
  },
  plugins: [htmlWebpackPlugin]
}
