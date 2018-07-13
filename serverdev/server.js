const express = require("express");
const webpack = require("webpack");
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const webpackDevMiddleware = require("webpack-dev-middleware");
const config = require("../webpack.dev.js");
const compiler = webpack(config);

const photosPath = path.join(__dirname, "../photos/");
const exiftoolPath = path.join(__dirname, "../bin/exiftool");
const exiftoolOutputRegex = /(IMG_\S*)\s+Subject\s*:\s*([a-z, ]+)/g;
const thumbsDirectoryName = "thumbs";

const allPhotoNames = Object.freeze(fs.readdirSync(photosPath));
const allTags = Object.freeze(getTagsOfPhotos());

const app = express();

app.use(
	webpackDevMiddleware(compiler, {
		publicPath: config.output.publicPath
	})
);

app.use(express.static(photosPath));

app.get("/photos", (req, res) => {
	allTags.tagsByPhotos
	res.end(JSON.stringify({
		photosByTags: photoMapToObject(allTags.photosByTags),
		tagsByPhotos: photoMapToArray(allTags.tagsByPhotos)
	}));
});

app.get("/tags", (req, res, next) => {
	res.end(
		JSON.stringify({
			tags: Array.from(allTags.allTags)
		})
	);
});

app.use(handleError);

function handleError(error, req, res, next) {
	res.status(500).send("Something broke!");
	next(error);
}

function getTagsOfPhotos() {
	const exiftoolOutput = execFileSync(exiftoolPath, [
		"-xmp:subject",
		photosPath
	]);

	const allTags = {
		allTags: new Set(),
		tagsByPhotos: new Map(),
		photosByTags: new Map()
	};

	let match, photoName, photoTags;
	while ((match = exiftoolOutputRegex.exec(exiftoolOutput))) {
		photoName = match[1];
		photoTags = match[2].split(/, */);

		allTags.allTags = new Set([...allTags.allTags, ...photoTags]);
		allTags.tagsByPhotos.set(photoName, photoTags);

		photoTags.forEach(tag => {
			let photosByTag = allTags.photosByTags.get(tag);
			if (!photosByTag) {
				photosByTag = new Set();
				allTags.photosByTags.set(tag, photosByTag);
			}
			photosByTag.add(photoName);
		})
	}
	
	return allTags;
}

const photoMapToArray = (map) => {
	let array = [];
	map.forEach((value, key) => {
		array.push({
			name: key,
			tags: value,
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

app.listen(8080, () => console.log("Server running on 8080..."));
