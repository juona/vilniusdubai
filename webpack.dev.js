const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development")
    })
  ],
  devtool: "inline-source-map",
  output: {
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              localIdentName: "[name]__[local]___[hash:base64:5]"
            }
          }
        ]
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: [
          "style-loader",
          {
            loader: "css-loader"
          }
        ]
      },
      {
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.inline\.svg$/,
        loader: "svg-inline-loader?classPrefix"
      },
      {
        test: /\.(png|jpg|jpeg|css\.svg)$/,
        loader: "url-loader",
        options: {
          limit: 100000
        }
      }
    ]
  }
});
