const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, 'dist/'),
    publicPath: '/',
    filename: 'index.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist/'),
    publicPath: '/',
    port: '3000',
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        exclude: [path.join(__dirname, 'node_modules/')],
        use: ['babel-loader'],
      },
      {
        test: /\.s(a|c)ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
};
