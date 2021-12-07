const { EnvironmentPlugin, DefinePlugin } = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
  },
  plugins: [
    new DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development'),
        'API_URL': JSON.stringify('http://localhost:9001')
      }
    }),
  ],
});
