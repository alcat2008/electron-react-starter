/**
 * Build config for electron 'Renderer Process' file
 */

import path from 'path';
import webpack from 'webpack';
import validate from 'webpack-validator';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import merge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
// import BabiliPlugin from 'babili-webpack-plugin';
import baseConfig from './webpack.config.base';
import paths from './paths';

export default validate(merge(baseConfig, {
  devtool: 'cheap-module-source-map',

  entry: [
    'babel-polyfill',
    // './src/index',
    paths.appIndexJs,
  ],

  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: '../'
  },

  module: {
    loaders: [
      {
        test: /\.less$/,
        exclude: path.resolve(__dirname, '../src/styles/views'),
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap&importLoaders=2!less')

      },
      {
        test: /\.less$/,
        include: path.resolve(__dirname, '../src/styles/views'),
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]&importLoaders=2!less')
      },

      // Fonts
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' },
    ]
  },

  plugins: [
    // This helps ensure the builds are consistent if source hasn't changed:
    new webpack.optimize.OccurrenceOrderPlugin(),
    // Try to dedupe duplicated modules, if any:
    new webpack.optimize.DedupePlugin(),

    // NODE_ENV should be production so that modules do not perform certain development checks
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),

    // new BabiliPlugin(),

    new ExtractTextPlugin('style.css', { allChunks: true }),

    new HtmlWebpackPlugin({
      filename: '../dist/index.html',
      template: 'src/public/index.html',
      inject: false
    })
  ],

  // https://github.com/chentsulin/webpack-target-electron-renderer#how-this-module-works
  target: 'electron-renderer'
}));
