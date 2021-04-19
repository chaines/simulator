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
  mode: isProduction ? 'production' : 'development',
  entry: path.join(__dirname, 'src', 'index.tsx'),
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss', '.sass', 'ts', '.tsx'],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist/'),
    publicPath: '/',
    port: Number(process.env.PORT) || 8080,
    host: '0.0.0.0',
    compress: true,
    hot: true,
    historyApiFallback: true,
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
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [Autoprefixer, Tailwind],
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /.css/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-lader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [Autoprefixer, Tailwind],
              },
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        exclude: path.join(__dirname, 'node_modules/'),
        use: 'babel-loader',
      },
    ],
  },
};

export default config;
