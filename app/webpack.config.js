
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';

const clientConfig = {
  target: 'web',
  entry: './src/client.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve('dist/client'),
    publicPath: '/',
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
      title: "Ticklist",
      favicon: './src/public/favicon.ico',
      template: './src/public/index.html'
    }),
    new webpack.ProvidePlugin({
      React: 'react'
    })
  ],
};

const serverConfig = {
  target: 'node',
  entry: './src/server.js',
  output: {
    filename: 'bundle.cjs',
    path: path.resolve('dist/server'),
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
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react'
    })
  ],
};

export default [ clientConfig, serverConfig ];
