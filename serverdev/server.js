const http = require('http');
const path = require("path");
const fs = require("fs");
const connect = require('connect');
const serveStatic = require('serve-static');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('../webpack.dev.js');
const compiler = webpack(config);

const app = connect();

app.use(webpackDevMiddleware(compiler, {
	publicPath: config.output.publicPath
}));

app.use((req, res, next) => {
	if (req.url === "/") {
		req.url = "/index.html";
	}

	next();
});

app.use(serveStatic(__dirname)).listen(8080, () => {
	console.log('Server running on 8080...');
});