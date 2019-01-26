const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: "./src/index.tsx",
  output: {
      filename: "index.js",
      path: path.resolve(__dirname, "dist"),
      publicPath: "http://localhost:5000/dist/"
  },

  mode: "development",

  resolve: {
    modules: [
      __dirname,
      path.resolve(__dirname, 'node_modules'),
    ],
    extensions: ['.js', '.d.ts', '.tsx', '.ts', '.jsx'],
  },

  module: {
      rules: [
          {
            test: /\.tsx?$/,
            loader: "awesome-typescript-loader",
            exclude: /node_modules/
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          },
          {
            test: /\.(png|jpg|gif)$/,
            use: [
              {
                loader: 'file-loader',
                options: {},
              },
            ],
          },
      ]
  },

  externals: {
      "react": "React",
      "react-dom": "ReactDOM"
  },
  devServer: {
    open: false,
    port: '5000',
    inline: true,
    historyApiFallback: true,
    disableHostCheck: true,
    host: '0.0.0.0',
    publicPath: "/dist/",
    contentBase: "./"
  }
};
