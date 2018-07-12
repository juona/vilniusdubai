const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
	entry: {
		main: "./src/index.js"
	},
	output: {
		path: path.resolve(__dirname, "build"),
		filename: "[name].bundle.js"
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: "Vilnius to Dubai"
		})
	]
};