import HttpUtils from "../../common/http-utils";

export const TOGGLE_FULL_PHOTO = Symbol("TOGGLE_FULL_PHOTO");
export const toggleFullPhoto = (photoName, photoIndex) => ({
  type: TOGGLE_FULL_PHOTO,
  payload: {
		photoName,
		photoIndex
  }
});

export const DISPLAY_NEXT_FULL_PHOTO = Symbol("DISPLAY_NEXT_FULL_PHOTO");
export const displayNextFullPhoto = () => function(dispatch, getState) {
  let {
    visibleFullPhoto: { index },
    photos: { items: photoList }
	} = getState();
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
