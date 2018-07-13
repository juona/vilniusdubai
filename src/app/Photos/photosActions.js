import { displayFatalError } from "../../actions";

export const REQUEST_PHOTOS = Symbol("REQUEST_PHOTOS");
const requestPhotos = (start, number) => ({
	type: REQUEST_PHOTOS
});

export const RECEIVE_PHOTOS = Symbol("RECEIVE_PHOTOS");
const receivePhotos = json => ({
	type: RECEIVE_PHOTOS,
	payload: {
		photos: json.data,
		hasMoreItems: json.hasMorePhotos
	}
});

export const fetchPhotos = () => {
	return function(dispatch, getState) {
		const state = getState();

		const isFetching = state.photos.isFetching;
		const hasMoreItems = state.photos.hasMoreItems;
		if (isFetching || !hasMoreItems) {
			return;
		}

		dispatch(requestPhotos());

		const numberOfPhotos = Object.keys(state.photos.items).length;
		return fetch(getPhotosQuery(numberOfPhotos, numberOfPhotosToLoad))
			.then(response => handleResponse(response, dispatch))
			.then(json => dispatch(receivePhotos(json)));
	};
};

const numberOfPhotosToLoad = 25;

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
