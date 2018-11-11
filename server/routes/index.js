import { IS_DEVELOPMENT, INDEX_FILE } from "../config";
import { getAllPhotos, getAllTags } from "./photos";

export default [
  {
    method: "get",
    skip: () => IS_DEVELOPMENT,
    name: "/",
    handler: (_, res) => res.sendFile(INDEX_FILE)
  },
  {
    method: "get",
    name: "/photos",
    handler: getAllPhotos
  },
  {
    method: "get",
    name: "/tags",
    handler: getAllTags
  }
];
