import path from "path";
import { execFileSync } from "child_process";
import logger from "../../utils/logger";
import { EXIFTOOL_PATH, PHOTOS_PATH, THUMBS_DIRECTORY_NAME } from "../../config";

const convertGPSCoordinateToDecimalDegrees = coord => coord ? (parseInt(coord[1]) + parseInt(coord[2])/60 + parseFloat(coord[3])/6000) : "";

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
				"-exif:xptitle",
        PHOTOS_PATH
      ])
				.toString("utf8")
				.replace(/ +/g, " ")
				.split("========");
			
			// Remove the first empty entry;
			lines.shift();

      logger.debug(`Exiftool read ${lines.length} files`);

      const photosData = {
        allTags: new Set(),
        tagsAndSizes: new Map(),
        photosByTags: new Map()
      };

			const photoNameRegex = /IMG_\S+/;
			const tagsRegex = /Subject\s:\s([^\n\r]+)\r\n/;
      const heightRegex = /Exif Image Height\s:\s([^\n\r]+)\r\n/;
			const widthRegex = /Exif Image Width\s:\s([^\n\r]+)\r\n/;
			const latitudeRegex = /GPS Latitude\s:\s(\d+) deg (\d+)' (\d+.\d+)" N\r\n/;
			const longitudeRegex = /GPS Longitude\s:\s(\d+) deg (\d+)' (\d+.\d+)" E\r\n/;
			const descriptionRegex = /XP Title\s:\s([^\n\r]+)\r\n/;

      let name, description, tags, height, width, latitude, longitude;
      lines.forEach(line => {
				name = photoNameRegex.exec(line);
				name = name && name[0];
				tags = tagsRegex.exec(line);
				tags = tags && tags[1] && tags[1].split(/, */);
        height = heightRegex.exec(line);
				height = height && height[1];
				width = widthRegex.exec(line);
				width = width && width[1];
				latitude = convertGPSCoordinateToDecimalDegrees(latitudeRegex.exec(line));
				longitude = convertGPSCoordinateToDecimalDegrees(longitudeRegex.exec(line));
				description = descriptionRegex.exec(line);
				description = description && description[1];

        photosData.allTags = new Set([...photosData.allTags, ...tags]);
        photosData.tagsAndSizes.set(name, {
					description,
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
      });

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
			description: value.description,
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
