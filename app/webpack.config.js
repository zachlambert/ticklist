
import path from 'path';
import webpack from 'webpack';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

const tailwindConfig = {
  content: ['./src/**/*.{js,jsx}', './public/index.html'],
  theme: {
    dim: {
      listPadding: '30px',
      listItemWidth: '350px',
    }
  },
  plugins: [],
};

const cssConfig = {
  test: /\.css$/i,
  use: [
    {
      loader: 'style-loader',
    },
    {
      loader: 'css-loader',
    },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [
            tailwindcss(tailwindConfig),
            autoprefixer
          ],
        }
      },
    }
  ],
};

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
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        type: 'asset/resource',
      },
      cssConfig
    ]
  },
  plugins: [
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
      cssConfig
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react'
    })
  ],
};

export default [ clientConfig, serverConfig ];
