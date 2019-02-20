const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const cwdPath = relativePath => path.join(process.cwd(), relativePath)
const resolveApp = relativePath => path.join(__dirname, relativePath)

const configPath = cwdPath('config.js')
const config = require(configPath)

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

const definePlugin = new webpack.DefinePlugin({
  'process.env.path': JSON.stringify(configPath)
})

module.exports = {
  mode: 'development',
  entry: {
    index: resolveApp('./src/index.js'),
    'es5-polyfill': require.resolve('es5-polyfill')
  },
  output: {
    path: cwdPath('./dist'),
    filename: 'js/[name].js',
    publicPath: '/'
  },
  devtool: 'source-map',
  resolve: {
    symlinks: true,
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  devServer: {
    contentBase: cwdPath('./dist'),
    compress: true,
    port: 9001
  },
  module: {
    rules: [
      {
        test: /config\.js$/,
        use: [babelLoader]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: babelLoader,
          options: {
            presets: [
              [require.resolve('@babel/preset-env'), {
                'loose': false,
                'useBuiltIns': 'entry',
                'targets': {
                  'browsers': [
                    'ie >= 8',
                    'Chrome >= 21',
                    'Firefox >= 1',
                    'Edge >= 13',
                    'last 3 versions'
                  ]
                }
              }]
            ],
            plugins: [
              [
                require.resolve('babel-plugin-import'),
                {
                  'libraryName': 'antd',
                  'libraryDirectory': 'lib',
                  'style': 'css'
                },
                'ant'
              ],
              [require.resolve('babel-plugin-lodash')],
              require.resolve('@babel/plugin-syntax-dynamic-import'),
              require.resolve('@babel/plugin-proposal-object-rest-spread'),
              require.resolve('@babel/plugin-proposal-class-properties'),
              [require.resolve('@babel/plugin-transform-react-jsx'), {
                'pragma': 'React.createElement'
              }],
              require.resolve('babel-plugin-transform-es3-member-expression-literals'),
              require.resolve('babel-plugin-transform-es3-property-literals')
            ]
          }
        }
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
  plugins: [htmlWebpackPlugin, definePlugin]
}

