const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackDashboardPlugin = require('webpack-dashboard/plugin');

const isDev = process.env.NODE_ENV === 'development';
const port = process.env.PORT || 3000;

const baseEntry = [
  'babel-polyfill',
  'whatwg-fetch',
  'normalize.css',
  './src/assets/reset.css',
  'font-awesome/css/font-awesome.css',
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
    favicon: 'src/assets/favicon.ico',
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
    publicPath: isDev ? '/' : '/front-end-challenge/',
    filename: '[name].[hash].js',
  },
  devtool: isDev ? 'eval-source-map' : false,
  resolve: { extensions: ['.js', '.jsx'] },
  plugins,
  module: {
    rules: [
      { test: /\.jsx?$/, loader: 'eslint-loader', enforce: 'pre' },
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, use: [{ loader: 'style-loader' }, { loader: 'css-loader' }] },
      { test: /\.(woff2?|ttf|eot|svg)(\?.*)?$/, loader: 'url-loader', options: { limit: 10000 } },
    ],
  },
  devServer: {
    compress: true,
    hot: true,
    port,
  },
};
