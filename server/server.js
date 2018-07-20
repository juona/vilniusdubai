const express = require("express");
const webpack = require("webpack");
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const PHOTOS_PATH = path.join(__dirname, "../photos/");
const EXIFTOOL_PATH = path.join(__dirname, "../bin/exiftool");
const DEFAULT_PORT = 8080;
const THUMBS_DIRECTORY_NAME = "thumbs";

const BUILD_PATH = path.join(__dirname, "../build/");
const INDEX_FILE = path.join(BUILD_PATH, "index.html");

const allPhotoNames = Object.freeze(fs.readdirSync(PHOTOS_PATH));
const photosData = Object.freeze(getPhotosData());

const app = express();

const isDevelopment  = app.get('env') !== "production";

console.log(`Production mode: ${!isDevelopment}`)

app.set("port", process.env.PORT || DEFAULT_PORT);

if (isDevelopment) {
	const webpackDevMiddleware = require("webpack-dev-middleware");
	const config = require("../webpack.dev.js");
	const compiler = webpack(config);

	app.use(
		webpackDevMiddleware(compiler, {
			publicPath: config.output.publicPath
		})
	);

} else {
	app.use(express.static(BUILD_PATH));

	app.get("/", (req, res) => res.sendFile(INDEX_FILE));
}

app.use(express.static(PHOTOS_PATH));

app.get("/photos", (req, res) => {
	res.end(JSON.stringify({
		photosByTags: photoMapToObject(photosData.photosByTags),
		tagsAndSizes: photoMapToArray(photosData.tagsAndSizes)
	}));
});

app.get("/tags", (req, res, next) => {
	res.end(
		JSON.stringify({
			tags: Array.from(photosData.allTags).sort()
		})
	);
});

app.use(handleError);

function handleError(error, req, res, next) {
	res.status(500).send("Something broke!");
	next(error);
}

function getPhotosData() {
	const lines = execFileSync(EXIFTOOL_PATH, [
		"-xmp:subject",
		"-exif:exifimageheight",
		"-exif:exifimagewidth",
		PHOTOS_PATH
	]).toString('utf8').split("\r\n");

	const photosData = {
		allTags: new Set(),
		tagsAndSizes: new Map(),
		photosByTags: new Map()
	};

	const photoNameRegex = /(IMG_\S+)$/;
	const tagsRegex = /^Subject\s+:\s+([a-z, ]+)/;
	const heightRegex = /^Exif Image Height\D+(\d+)/;
	const widthRegex = /^Exif Image Width\D+(\d+)/;

	let match, name, tags, height, width;
	for (var lineIndex = 0; lineIndex < lines.length - 3; lineIndex += 4) {
		name = photoNameRegex.exec(lines[lineIndex])[0];
		tags = tagsRegex.exec(lines[lineIndex + 1])[1].split(/, */);
		height = heightRegex.exec(lines[lineIndex + 2])[1];
		width = widthRegex.exec(lines[lineIndex + 3])[1];

		photosData.allTags = new Set([...photosData.allTags, ...tags]);
		photosData.tagsAndSizes.set(name, {
			tags,
			height,
			width
		});

		tags.forEach(tag => {
			let photosByTag = photosData.photosByTags.get(tag);
			if (!photosByTag) {
				photosByTag = new Set();
				photosData.photosByTags.set(tag, photosByTag);
			}
			photosByTag.add(name);
		})
	}
	
	return photosData;
}

const photoMapToArray = (map) => {
	let array = [];
	map.forEach((value, key) => {
		array.push({
			name: key,
			tags: value.tags,
			height: value.height,
			width: value.width,
			thumbnail: path.join("thumbs", key)
		})
	});
	return array;
}

const photoMapToObject = map => {
	let object = {};
	map.forEach((value, key) => {
		object[key] = Array.from(value)
	});
	return object;
}

app.listen(app.get("port"), () => console.log(`Server running on ${app.get("port")}...`));