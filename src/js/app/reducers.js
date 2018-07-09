import { combineReducers } from 'redux';
import { TOGGLE_TAG } from "./actions";

const selectedTags = function(state = new Set(), action) {
	var stateCopy;
	var payload = action.payload || {};
	var tagName = payload.tagName;

	switch (action.type) {
		case TOGGLE_TAG:
			stateCopy = new Set(state);
			stateCopy.has(tagName) ? stateCopy.delete(tagName) : stateCopy.add(tagName);
			return stateCopy;
		default:
			return state;
	}
}


const photosDataMock = ["https://i.ytimg.com/vi/Bor5lkRyeGo/hqdefault.jpg", "https://www.html-5-tutorial.com/images/image-tag.gif"];

const tagNamesDataMock = ["bicycle", "road"];

const photos = function(state = photosDataMock, action) {
	return state;
}

const tagNames = function(state = tagNamesDataMock, action) {
	return state;
}

export default combineReducers({
	selectedTags,
	photos,
	tagNames
});