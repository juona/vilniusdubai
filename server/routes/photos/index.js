import path from "path";
import { execFileSync } from "child_process";
import logger from "../../utils/logger";
import { EXIFTOOL_PATH, PHOTOS_PATH, THUMBS_DIRECTORY_NAME } from "../../config";

const photosData = Object.freeze(
  (() => {
    try {
      logger.debug(`Will run exiftool in ${PHOTOS_PATH}`);

      const lines = execFileSync(EXIFTOOL_PATH, [
        "-xmp:subject",
        "-exif:exifimageheight",
        "-exif:exifimagewidth",
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
      const tagsRegex = /^Subject\s+:\s+([a-z, ]+)/;
      const heightRegex = /^Exif Image Height\D+(\d+)/;
      const widthRegex = /^Exif Image Width\D+(\d+)/;

      let name, tags, height, width;
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
