import path from "path";
import { execFileSync } from "child_process";
import logger from "../../utils/logger";
import { EXIFTOOL_PATH, PHOTOS_PATH, THUMBS_DIRECTORY_NAME } from "../../config";

const convertGPSCoordinateToDecimalDegrees = coord => parseInt(coord[1]) + parseInt(coord[2])/60 + parseFloat(coord[3])/6000;

const photosData = Object.freeze(
  (() => {
    try {
      logger.debug(`Will run exiftool in ${PHOTOS_PATH}`);

      const lines = execFileSync(EXIFTOOL_PATH, [
        "-xmp:subject",
        "-exif:exifimageheight",
				"-exif:exifimagewidth",
				"-gpslatitude",
				"-gpslongitude",
        PHOTOS_PATH
      ])
        .toString("utf8")
        .split("\r\n");

      logger.debug(`Exiftool output contains ${lines.length} lines`);

      const photosData = {
        allTags: new Set(),
        tagsAndSizes: new Map(),
        photosByTags: new Map()
      };

      const photoNameRegex = /(IMG_\S+)$/;
      const tagsRegex = /^Subject\s+:\s([a-z, ]+)/;
      const heightRegex = /^Exif Image Height\D+(\d+)/;
			const widthRegex = /^Exif Image Width\D+(\d+)/;
			const latitudeRegex = /^GPS Latitude\s+:\s(\d+) deg (\d+)' (\d+.\d+)"/;
			const longitudeRegex = /^GPS Longitude\s+:\s(\d+) deg (\d+)' (\d+.\d+)"/;

      let name, tags, height, width, latitude, longitude;
      for (var lineIndex = 0; lineIndex < lines.length - 3; lineIndex += 6) {
        name = photoNameRegex.exec(lines[lineIndex])[0];
        tags = tagsRegex.exec(lines[lineIndex + 1])[1].split(/, */);
        height = heightRegex.exec(lines[lineIndex + 2])[1];
				width = widthRegex.exec(lines[lineIndex + 3])[1];
				latitude = convertGPSCoordinateToDecimalDegrees(latitudeRegex.exec(lines[lineIndex + 4]));
				longitude = convertGPSCoordinateToDecimalDegrees(longitudeRegex.exec(lines[lineIndex + 5]));

        photosData.allTags = new Set([...photosData.allTags, ...tags]);
        photosData.tagsAndSizes.set(name, {
          tags,
          height,
					width,
					latitude,
					longitude
        });

        tags.forEach(tag => {
          let photosByTag = photosData.photosByTags.get(tag);
          if (!photosByTag) {
            photosByTag = new Set();
            photosData.photosByTags.set(tag, photosByTag);
          }
          photosByTag.add(name);
        });
      }

      return photosData;
    } catch (error) {
      logger.error("Failed to read exif data, throwing error");
      throw error;
    }
  })()
);

const photoMapToArray = map => {
  let array = [];
  map.forEach((value, key) => {
    array.push({
      name: path.join("photos", key),
      tags: value.tags,
      height: value.height,
			width: value.width,
			location: {
				lat: value.latitude,
				long: value.longitude
			},
      thumbnail: path.join("photos", THUMBS_DIRECTORY_NAME, key)
    });
  });
  return array;
};

const photoMapToObject = map => {
  let object = {};
  map.forEach((value, key) => {
    object[key] = Array.from(value);
  });
  return object;
};

export const getAllPhotos = (_, res) => {
  res.end(
    JSON.stringify({
      photosByTags: photoMapToObject(photosData.photosByTags),
      tagsAndSizes: photoMapToArray(photosData.tagsAndSizes)
    })
  );
};

export const getAllTags = (_, res) => {
  res.end(
    JSON.stringify({
      tags: Array.from(photosData.allTags).sort()
    })
  );
};
