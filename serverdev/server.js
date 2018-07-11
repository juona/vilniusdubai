const express = require("express");
const webpack = require("webpack");
const fs = require("fs");
const path = require("path");
const { execFile } = require("child_process");
const webpackDevMiddleware = require("webpack-dev-middleware");
const config = require("../webpack.dev.js");
const compiler = webpack(config);

const photosPath = path.join(__dirname, "../photos/");
const exiftoolPath = path.join(__dirname, "../bin/exiftool");

const allPhotoNames = fs.readdirSync(photosPath);

const app = express();

app.use(
	webpackDevMiddleware(compiler, {
		publicPath: config.output.publicPath
	})
);

app.get("/photos", (req, res) => {
	let startIndex = req.query.start;
	let number = req.query.number;
	getPhotos(startIndex, number).then(allTags => {
		res.end(
			JSON.stringify({
				data: convertTagsByPhotosMapToObject(allTags.tagsByPhotos)
			})
		);
	});
});

app.get("/tags", (req, res) => {
	getTagsOfPhotos().then(allTags => {
		res.end(
			JSON.stringify({
				data: Array.from(allTags.allTags)
			})
		);
	});
});

function getPhotos(startIndex, number) {
	let requiredPhotoNames = allPhotoNames.slice(
		startIndex,
		startIndex + number
	);
	return getTagsOfPhotos(requiredPhotoNames);
}

function getTagsOfPhotos(photoNames) {
	let photoPathCMDArgument = getEXIFToolPhotoPathCMDArgument(photoNames);
	return new Promise(resolve => {
		exiftool = execFile(
			exiftoolPath,
			["-xmp:subject", ...photoPathCMDArgument],
			(error, stdout) => {
				let outputRegex = /(IMG_\S*)\s+Subject\s*:\s*([a-z, ]+)/g;
				let allTags = {
					allTags: new Set(),
					tagsByPhotos: new Map()
				};

				let match, imageName, photoTags;
				while ((match = outputRegex.exec(stdout))) {
					imageName = match[1];
					photoTags = new Set(match[2].split(/, */));

					allTags.allTags = new Set([
						...allTags.allTags,
						...photoTags
					]);
					allTags.tagsByPhotos.set(imageName, photoTags);
				}

				resolve(allTags);
			}
		);
	});
}

function getEXIFToolPhotoPathCMDArgument(photoNames) {
	if (photoNames) {
		photoNames.forEach((photoName, index) => {
			photoNames[index] = photosPath + photoName;
		});
		return photoNames;
	} else {
		return [photosPath];
	}
}

function convertTagsByPhotosMapToObject(tagsByPhotos) {
	const tagsByPhotosObject = {};
	for (let [photoName, tagSet] of tagsByPhotos) {
		tagsByPhotosObject[photoName] = {
			tags: Array.from(tagSet),
			photoName: photoName
		}
	}
	return tagsByPhotosObject;
}

app.listen(8080, () => console.log("Server running on 8080..."));
