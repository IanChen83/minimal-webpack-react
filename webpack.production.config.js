const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const SRC_DIR = path.resolve(__dirname, 'app')
const BUILD_DIR = path.resolve(__dirname, 'build')

const config = {
  stats: {
    maxModules: 0,
  },
  mode: 'production',
  devtool: 'cheap-module-source-map',

  entry: ['./main.js'],

  context: SRC_DIR,

  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: BUILD_DIR,
    publicPath: '',
  },

  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new HtmlWebpackPlugin({
      template: `${__dirname}/app/index.html`,
      filename: 'index.html',
      inject: 'body',
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production') },
    }),
    // new ExtractTextPlugin({ filename: './styles/style.css', disable: false, allChunks: true }),
    new CopyWebpackPlugin([{ from: './vendors', to: 'vendors' }]),
  ],

  optimization: {
    runtimeChunk: false,
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      // To keep it simple, disable the following loaders
      // {
      //   test: /\.scss$/,
      //   exclude: /node_modules/,
      //   use: ExtractTextPlugin.extract({
      //     fallback: 'style-loader',
      //     use: [
      //       'css-loader',
      //       { loader: 'sass-loader', query: { sourceMap: false } },
      //     ],
      //     publicPath: '../'
      //   }),
      // },
      // {
      //   test: /\.(png|jpg|gif)$/,
      //   use: [
      //     {
      //       loader: 'url-loader',
      //       options: {
      //         limit: 8192,
      //         mimetype: 'image/png',
      //         name: 'images/[name].[ext]',
      //       }
      //     }
      //   ],
      // },
      // {
      //   test: /\.eot(\?v=\d+.\d+.\d+)?$/,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         name: 'fonts/[name].[ext]'
      //       }
      //     }
      //   ],
      // },
      // {
      //   test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      //   use: [
      //     {
      //       loader: 'url-loader',
      //       options: {
      //         limit: 8192,
      //         mimetype: 'application/font-woff',
      //         name: 'fonts/[name].[ext]',
      //       }
      //     }
      //   ],
      // },
      // {
      //   test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
      //   use: [
      //     {
      //       loader: 'url-loader',
      //       options: {
      //         limit: 8192,
      //         mimetype: 'application/octet-stream',
      //         name: 'fonts/[name].[ext]',
      //       }
      //     }
      //   ],
      // },
      // {
      //   test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      //   use: [
      //     {
      //       loader: 'url-loader',
      //       options: {
      //         limit: 8192,
      //         mimetype: 'image/svg+xml',
      //         name: 'images/[name].[ext]',
      //       }
      //     }
      //   ],
      // },
    ],
  },
}

module.exports = config
