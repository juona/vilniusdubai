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
const exiftoolOutputRegex = /(IMG_\S*)\s+Subject\s*:\s*([a-z, ]+)/g;
const thumbsDirectoryName = "thumbs";

const allPhotoNames = fs.readdirSync(photosPath);

const app = express();

app.use(
	webpackDevMiddleware(compiler, {
		publicPath: config.output.publicPath
	})
);

app.use(express.static(photosPath));

app.get("/photos", (req, res, next) => {
	let startIndex = parseInt(req.query.start);
	let number = parseInt(req.query.number);
	getPhotos(startIndex, number).then(
		photosData => {
			res.end(
				JSON.stringify({
					data: convertTagsByPhotosMapToObject(
						photosData.tagsByPhotos
					),
					hasMorePhotos: photosData.hasMorePhotos
				})
			);
		},
		error => {
			next(error);
		}
	);
});

app.get("/tags", (req, res, next) => {
	getTagsOfPhotos().then(
		tagsData => {
			res.end(
				JSON.stringify({
					data: Array.from(tagsData.allTags)
				})
			);
		},
		error => {
			next(error);
		}
	);
});

app.use(handleError);

function handleError(error, req, res, next) {
	res.status(500).send("Something broke!");
	next(error);
}

function getPhotos(startIndex, number) {
	const requiredPhotoNames = allPhotoNames.slice(
		startIndex,
		startIndex + number
	);
	const hasMorePhotos = startIndex + number < allPhotoNames.length;
	return getTagsOfPhotos(requiredPhotoNames).then(tagsData => {
		tagsData.hasMorePhotos = hasMorePhotos;
		return tagsData;
	}); 
}

function getTagsOfPhotos(photoNames) {
	let photoPathCMDArgument = getEXIFToolPhotoPathCMDArgument(photoNames);
	return new Promise((resolve, reject) => {
		exiftool = execFile(
			exiftoolPath,
			["-xmp:subject", ...photoPathCMDArgument],
			(error, stdout) => {
				if (error) {
					reject(error);
				}

				let allTags = {
					allTags: new Set(),
					tagsByPhotos: new Map()
				};

				let match, imageName, photoTags;
				while ((match = exiftoolOutputRegex.exec(stdout))) {
					imageName = path.join(thumbsDirectoryName, match[1]);
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
			photoNames[index] = path.join(photosPath, photoName);
		});
		return photoNames;
	} else {
		return [photosPath];
	}
}

function convertTagsByPhotosMapToObject(tagsByPhotos) {
	if (!tagsByPhotos) {
		return {};
	}

	const tagsByPhotosObject = {};
	for (let [photoName, tagSet] of tagsByPhotos) {
		tagsByPhotosObject[photoName] = {
			tags: Array.from(tagSet),
			photoName: photoName
		};
	}
	return tagsByPhotosObject;
}

function hasMorePhotos(tagsByPhotos) {
	return tagsByPhotos && Array.from(tagsByPhotos.keys()).length 
}

app.listen(8080, () => console.log("Server running on 8080..."));
