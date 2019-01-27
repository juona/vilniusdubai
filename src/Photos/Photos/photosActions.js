import HttpUtils from "../../common/http-utils";
import { morePhotosAvailable, getVisiblePhotos } from "./photosSelectors";

const PHOTO_NUMBER_INCREMENT = 25;

export const TOGGLE_FULL_PHOTO = Symbol("TOGGLE_FULL_PHOTO");
export const toggleFullPhoto = (photoName, photoIndex) => ({
  type: TOGGLE_FULL_PHOTO,
  payload: {
    photoName,
    photoIndex
  }
});

export const DISPLAY_NEXT_FULL_PHOTO = Symbol("DISPLAY_NEXT_FULL_PHOTO");
export const displayNextFullPhoto = () =>
  function(dispatch, getState) {
    const state = getState();
    let {
      visibleFullPhoto: { index }
    } = state;
    const photoList = getVisiblePhotos(state);
    index++;
    let nextPhoto = photoList[index];
    if (!nextPhoto) {
      index = 0;
      nextPhoto = photoList[index];
    }
    dispatch({
      type: DISPLAY_NEXT_FULL_PHOTO,
      payload: {
        photoName: nextPhoto.name,
        photoIndex: index
      }
    });
  };

export const DISPLAY_PREVIOUS_FULL_PHOTO = Symbol("DISPLAY_PREVIOUS_FULL_PHOTO");
export const displayPreviousFullPhoto = () =>
  function(dispatch, getState) {
    const state = getState();
    let {
      visibleFullPhoto: { index }
    } = state;
    const photoList = getVisiblePhotos(state);
    index--;
    let nextPhoto = photoList[index];
    if (!nextPhoto) {
      index = photoList.length - 1;
      nextPhoto = photoList[index];
    }
    dispatch({
      type: DISPLAY_PREVIOUS_FULL_PHOTO,
      payload: {
        photoName: nextPhoto.name,
        photoIndex: index
      }
    });
  };

export const DISPLAY_MORE_PHOTOS = Symbol("DISPLAY_MORE_PHOTOS");
export const displayMorePhotos = () =>
  function(dispatch, getState) {
    const state = getState();
    if (morePhotosAvailable(state)) {
      dispatch({
        type: DISPLAY_MORE_PHOTOS,
        payload: {
          number: state.numberOfVisiblePhotos + PHOTO_NUMBER_INCREMENT
        }
      });
    }
  };

export const RESET_PHOTOS_LIST = Symbol("RESET_PHOTOS_LIST");
export const resetPhotosList = () => ({
  type: RESET_PHOTOS_LIST,
  payload: {
    number: PHOTO_NUMBER_INCREMENT
  }
});

export const REQUEST_PHOTOS = Symbol("REQUEST_PHOTOS");
const requestPhotos = () => ({
  type: REQUEST_PHOTOS
});

export const RECEIVE_PHOTOS = Symbol("RECEIVE_PHOTOS");
const receivePhotos = json => ({
  type: RECEIVE_PHOTOS,
  payload: {
    tagsAndSizes: json.tagsAndSizes.reduce((map, item) => map.set(item.name, item), new Map()),
    photosByTags: json.photosByTags
  }
});

export const fetchPhotos = () => HttpUtils.fetchData("photos", requestPhotos, receivePhotos);
