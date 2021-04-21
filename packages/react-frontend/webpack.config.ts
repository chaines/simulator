import Webpack from 'webpack';
import WebpackDev from 'webpack-dev-server';
import Autoprefixer from 'autoprefixer';
import Tailwind from 'tailwindcss';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import path from 'path';
import fs from 'fs';

export interface Configuration extends Webpack.Configuration, WebpackDev.Configuration {}

const mode = process.env.NODE_ENV ?? 'development';
const isProduction = mode === 'production';
const isDevelopment = !isProduction;

const config: Configuration = {
  mode: 'development',
  entry: path.join(__dirname, 'src', 'index.tsx'),
  output: {
    path: path.join(__dirname, 'dist/'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  target: 'web',
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss', '.sass', '.ts', '.tsx'],
    alias: {
      '@simulation-engine': path.join(__dirname, '..', 'sim-engine', 'src'),
    },
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist/'),
    publicPath: '/',
    port: 8080,
    hot: true,
    host: '0.0.0.0',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, 'public', 'assets'),
          to: 'assets',
          globOptions: {
            ignore: ['*.DS_STORE'],
          },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
      filename: 'index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [path.join(__dirname, 'node_modules/')],
        use: 'babel-loader',
      },
      {
        test: /\.s(c|a)ss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { url: false },
          },
          {
            loader: 'postcss-loader',
            options: { postcssOptions: { plugins: [Tailwind, Autoprefixer] } },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: path.join(__dirname, 'node_modules/'),
        loader: 'ts-loader',
      },
    ],
  },
};

export default config;
