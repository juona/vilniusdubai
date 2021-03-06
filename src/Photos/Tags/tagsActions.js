import HttpUtils from "../../common/http-utils";
import { resetPhotosList } from "../Photos/photosActions";

export const TOGGLE_TAG = Symbol("TOGGLE_TAG");
export const toggleTag = tagName =>
  function(dispatch) {
    dispatch({
      type: TOGGLE_TAG,
      payload: { tagName }
    });
    dispatch(resetPhotosList());
  };

export const TOGGLE_TAG_LIST = Symbol("TOGGLE_TAG_LIST");
export const toggleTagList = () => ({
  type: TOGGLE_TAG_LIST
});

export const REQUEST_TAGS = Symbol("REQUEST_TAGS");
const requestTags = () => ({
  type: REQUEST_TAGS
});

export const RECEIVE_TAGS = Symbol("RECEIVE_TAGS");
const receiveTags = json => ({
  type: RECEIVE_TAGS,
  payload: {
    tags: json.tags
  }
});

export const fetchTags = () => HttpUtils.fetchData("tags", requestTags, receiveTags);
