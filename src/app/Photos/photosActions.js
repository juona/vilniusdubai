import { displayFatalError } from "../../actions";

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

export const fetchPhotos = () => {
	return function(dispatch, getState) {
		dispatch(requestPhotos());
		return fetch("photos")
			.then(response => handleResponse(response, dispatch))
			.then(json => dispatch(receivePhotos(json)));
	};
};

function handleResponse(response, dispatch) {
	if (response.status === 500) {
		dispatch(displayFatalError("Server Error!"));
		return Promise.reject();
	} else {
		return response.json();
	}
}
