import path from "path";
import webpackConfig from "../../webpack.dev";

const defaults = {
	PORT: 8080,
	NODE_ENV: "development",
	THUMBS_DIRECTORY_NAME: "thumbs",
	PHOTOS_PATH: path.join(__dirname, "../../photos"),
	DISABLE_LOGGING: false,
	LOG_LEVEL: "debug"
};

const getConfig = name => process.env[name] || defaults[name];

export const ENV = getConfig("NODE_ENV");
export const IS_DEVELOPMENT = ENV === "development";
export const PORT = getConfig("PORT");
export const BUILD_PATH = webpackConfig.output.publicPath;
export const INDEX_FILE = path.join(BUILD_PATH, webpackConfig.output.filename);
export const PHOTOS_PATH = getConfig("PHOTOS_PATH");
export const THUMBS_DIRECTORY_NAME = getConfig("THUMBS_DIRECTORY_NAME");
export const EXIFTOOL_PATH = path.join(__dirname, "../bin/exiftool");
export const DISABLE_LOGGING = getConfig("DISABLE_LOGGING");
export const LOG_LEVEL = getConfig("LOG_LEVEL");