
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-react', { targets: "defaults" }]
            ]
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: 'style-loader', // Inject CSS
          },
          {
            loader: 'css-loader', // Translates CSS into CommonJS modules
          },
          {
            loader: 'postcss-loader', // Run post CSS actions
            options: {
              postcssOptions: {
                plugins: function() { // Post CSS plugins
                  require [
                    require('precss'),
                    require('autoprefixer')
                  ]
                }
              }
            }
          },
          {
            loader: 'sass-loader' // Compile Sass to CSS
          }
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Lists",
      favicon: './src/favicon.ico',
      template: './src/index.html'
    }),
    new webpack.ProvidePlugin({
      React: 'react'
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
  },
};
