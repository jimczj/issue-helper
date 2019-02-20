const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const autoprefixer = require('autoprefixer')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const cwdPath = relativePath => path.join(process.cwd(), relativePath)
const resolveApp = relativePath => path.resolve(__dirname, relativePath)

const configPath = cwdPath('config.js')
const config = require(configPath)


const babelLoader = require.resolve('babel-loader')
const tsLoader = {
  loader: require.resolve('ts-loader'),
  options: {
    onlyCompileBundledFiles: true
  }
}
const urlLoader = {
  loader: require.resolve('url-loader')
}
const fileLoader = {
  loader: require.resolve('file-loader'),
  options: {
    outputPath: 'fonts/'
  }
}
const cssLoader = {
  loader: require.resolve('css-loader'),
  options: {
    minimize: true,
    importLoaders: 2
  }
}
const postcssLoader = {
  loader: require.resolve('postcss-loader'),
  options: {
    plugins: () => [autoprefixer]
  }
}
const sassLoader = {
  loader: require.resolve('sass-loader'),
  options: {
    outputStyle: 'expanded'
  }
}
const miniCssExtractPlugin = new MiniCssExtractPlugin({
  filename: 'css/[name].[hash:4].css'
})
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  title: config.title,
  logo: config.logo,
  inject: false,
  template: resolveApp('./src/index.html'),
  minify: {
    removeComments: true,
    collapseWhitespace: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
    removeEmptyAttributes: true,
    removeStyleLinkTypeAttributes: true,
    keepClosingSlash: true,
    minifyJS: true,
    minifyCSS: true,
    minifyURLs: true,
    minifyHTML: true
  }
})
const uglifyJSPlugin = new UglifyJSPlugin({
  uglifyOptions: {
    keep_fnames: false
  }
})

const cleanWebpackPlugin = new CleanWebpackPlugin(['dist'], { verbose: false, root: process.cwd() })
const definePlugin = new webpack.DefinePlugin({
  'process.env.path': JSON.stringify(configPath)
})

module.exports = {
  mode: 'production',
  entry: {
    index: resolveApp('./src/index.js'),
    'es5-polyfill': require.resolve('es5-polyfill')
  },
  output: {
    path: cwdPath('./dist'),
    filename: 'js/[name].[hash:4].js',
    publicPath: '/'
  },
  resolve: {
    symlinks: true,
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
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
        test: /\.(jpe?g|png|gif)$/,
        use: [urlLoader]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: fileLoader
      },
      {
        test: /\.s?css$/,
        use: [MiniCssExtractPlugin.loader, cssLoader, postcssLoader, sassLoader]
      }
    ]
  },
  plugins: [cleanWebpackPlugin, htmlWebpackPlugin, miniCssExtractPlugin, definePlugin],
  optimization: {
    minimizer: [uglifyJSPlugin]
  }
}
