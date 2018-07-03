const webpack = require('webpack');
const merge = require("webpack-merge");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const common = require("./webpack.common.js");

module.exports = merge(common, {
	mode: "production",
	plugins: [
		new CleanWebpackPlugin(["build"]),
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify("production")
		}),
		new MiniCssExtractPlugin({
			filename: "[name].css",
			chunkFilename: "[id].css"
		})
	],
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				cache: true,
				parallel: true
			}),
			new OptimizeCSSAssetsPlugin({})
		]
	},
	module: {
		rules: [{
			test: /\.css$/,
			use: [{
					loader: MiniCssExtractPlugin.loader
				},
				"css-loader"
			]
		}]
	}
});