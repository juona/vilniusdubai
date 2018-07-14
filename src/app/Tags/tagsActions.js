import { displayFatalError } from "../../actions";

export const TOGGLE_TAG = Symbol("TOGGLE_TAG");
export const toggleTag = tagName => ({
	type: TOGGLE_TAG,
	payload: { tagName }
});

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

export const fetchTags = () => {
	return function(dispatch) {
		dispatch(requestTags());

		return fetch("tags")
			.then(response => handleResponse(response, dispatch))
			.then(json => dispatch(receiveTags(json)));
	};
};

function handleResponse(response, dispatch) {
	if (response.status === 500) {
		dispatch(displayFatalError("Server Error!"));
		return Promise.reject("test");
	} else {
		return response.json();
	}
}
