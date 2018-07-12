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