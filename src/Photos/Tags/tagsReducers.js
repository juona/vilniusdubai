import { TOGGLE_TAG, TOGGLE_TAG_LIST, REQUEST_TAGS, RECEIVE_TAGS } from "./tagsActions";

export const selectedTags = function(state = new Set(), action) {
	switch (action.type) {
		case TOGGLE_TAG:
			let stateCopy = new Set(state);
			let tagName = action.payload.tagName;
			stateCopy.has(tagName)
				? stateCopy.delete(tagName)
				: stateCopy.add(tagName);
			return stateCopy;
		default:
			return state;
	}
};

export const tags = function(
	state = {
		isFetching: false,
		items: []
	},
	action
) {
	switch (action.type) {
		case REQUEST_TAGS:
			return Object.assign({}, state, {
				isFetching: true
			});
		case RECEIVE_TAGS:
			return {
				isFetching: false,
				items: action.payload.tags
			};
		default:
			return state;
	}
	return state;
};

export const isTagListVisible = function(state = false, action) {
	switch (action.type) {
		case TOGGLE_TAG_LIST:
			return !state;
		default:
			return state;
	}
}