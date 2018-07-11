export const TOGGLE_TAG = Symbol();
export const toggleTag = tagName => ({
	type: TOGGLE_TAG,
	payload: { tagName }
});

export const REQUEST_TAGS = Symbol();
const requestTags = () => ({
	type: REQUEST_TAGS
});

export const RECEIVE_TAGS = Symbol();
const receiveTags = json => ({
	type: RECEIVE_TAGS,
	payload: {
		tagNames: json.data
	}
});

export const fetchTags = () => {
	return function(dispatch) {
		dispatch(requestTags());

		return fetch("tags")
			.then(
				response => response.json(),
				error => console.log("An error occurred.", error)
			)
			.then(json => dispatch(receiveTags(json)));
	};
}

export const REQUEST_PHOTOS = Symbol();
const requestPhotos = (start, number) => ({
	type: REQUEST_PHOTOS,
	payload: {
		start,
		end: start + number - 1
	}
});

export const RECEIVE_PHOTOS = Symbol();
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
			.then(
				response => response.json(),
				error => console.log("An error occurred.", error)
			)
			.then(json => dispatch(receivePhotos(json)));
	};
}

function getPhotosQuery(start, number) {
	return "photos?start=" + start + "&number=" + number;
}