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
				test: /\.js(x?)$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			},
			{
				test: /\.(png|jpg|jpeg)$/,
				loader: "url-loader",
				options: {
					limit: 100000
				}
			}
		]
	}
});
