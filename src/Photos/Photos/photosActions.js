import HttpUtils from "../../common/http-utils";

export const TOGGLE_FULL_PHOTO = Symbol("TOGGLE_FULL_PHOTO");
export const toggleFullPhoto = (photoName) => ({
	type: TOGGLE_FULL_PHOTO,
	payload: {
		photoName
	}
});

export const DISPLAY_MORE_PHOTOS = Symbol("DISPLAY_MORE_PHOTOS");
export const displayMorePhotos = () => ({
	type: DISPLAY_MORE_PHOTOS
});

export const REQUEST_PHOTOS = Symbol("REQUEST_PHOTOS");
const requestPhotos = () => ({
	type: REQUEST_PHOTOS
});

export const RECEIVE_PHOTOS = Symbol("RECEIVE_PHOTOS");
const receivePhotos = json => ({
	type: RECEIVE_PHOTOS,
	payload: {
		tagsAndSizes: json.tagsAndSizes,
		photosByTags: json.photosByTags
	}
});

export const fetchPhotos = () => HttpUtils.fetchData("photos", requestPhotos, receivePhotos);