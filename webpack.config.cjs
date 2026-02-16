const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      // JS / ES Modules
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'], // transpile modern JS
          },
        },
      },
      // CSS
      {
        test: /\.css$/i,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    !isDev &&
      new MiniCssExtractPlugin({
        filename: 'style.css',
      }),
  ].filter(Boolean),
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    open: true,
    hot: true, // HMR for CSS & JS
  },
  resolve: {
    extensions: ['.js'], // allows importing JS modules without extensions
  },
};
