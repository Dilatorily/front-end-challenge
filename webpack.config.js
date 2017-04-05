const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackDashboardPlugin = require('webpack-dashboard/plugin');

const isDev = process.env.NODE_ENV === 'development';
const port = process.env.PORT || 3000;

const baseEntry = [
  'babel-polyfill',
  './src/index.jsx',
];
const devEntry = [
  'react-hot-loader/patch',
  `webpack-dev-server/client?http://localhost:${port}`,
  'webpack/hot/only-dev-server',
];
const entry = [...(isDev ? devEntry : []), ...baseEntry];

const basePlugins = [
  new webpack.EnvironmentPlugin(['NODE_ENV']),
  new webpack.DefinePlugin({ __DEV__: isDev }),
  new HtmlWebpackPlugin({
    template: 'src/index.html',
    inject: 'body',
    minify: { collapseWhitespace: true },
  }),
];
const devPlugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
  new WebpackDashboardPlugin(),
];
const prodPlugins = [
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
  }),
];
const plugins = [...basePlugins, ...(isDev ? devPlugins : prodPlugins)];

module.exports = {
  entry,
  output: {
    path: path.join(__dirname, 'docs'),
    publicPath: '/',
    filename: '[name].[hash].js',
  },
  devtool: isDev ? 'eval-source-map' : false,
  resolve: { extensions: ['.js', '.jsx'] },
  plugins,
  module: {
    rules: [
      { test: /\.jsx?$/, loader: 'eslint-loader', enforce: 'pre' },
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
    ],
  },
  devServer: {
    port,
    compress: true,
    hot: true,
  },
};
