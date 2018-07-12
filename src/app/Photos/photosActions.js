import { displayFatalError } from "../ErrorScreen/errorScreenActions";

export const REQUEST_PHOTOS = Symbol("REQUEST_PHOTOS");
const requestPhotos = (start, number) => ({
	type: REQUEST_PHOTOS,
	payload: {
		start,
		end: start + number - 1
	}
});

export const RECEIVE_PHOTOS = Symbol("RECEIVE_PHOTOS");
const receivePhotos = json => ({
	type: RECEIVE_PHOTOS,
	payload: {
		photos: json.data
	}
});

export const fetchPhotos = (start, number) => {
	return function(dispatch) {
		dispatch(requestPhotos(start, number));

		return fetch(getPhotosQuery(start, number))
			.then(response => handleResponse(response, dispatch))
			.then(json => dispatch(receivePhotos(json)));
	};
};

function getPhotosQuery(start, number) {
	return "photos?start=" + start + "&number=" + number;
}

function handleResponse(response, dispatch) {
	if (response.status === 500) {
		dispatch(displayFatalError("Server Error!"));
		return Promise.reject("test");
	} else {
		return response.json();
	}
}
