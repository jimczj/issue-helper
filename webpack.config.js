const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const autoprefixer = require('autoprefixer')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const config = require('./config.js')

const resolveApp = relativePath => path.resolve(__dirname, relativePath)

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
    ie8: true,
    keep_fnames: true
  }
})
const cleanWebpackPlugin = new CleanWebpackPlugin('dist/**')

module.exports = {
  mode: 'production',
  entry: {
    index: resolveApp('./src/index.js'),
    'es5-polyfill': 'es5-polyfill'
  },
  output: {
    path: resolveApp('./dist'),
    filename: 'js/[name].[hash:4].js',
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
  plugins: [cleanWebpackPlugin, htmlWebpackPlugin, miniCssExtractPlugin],
  optimization: {
    minimizer: [uglifyJSPlugin]
  }
}
