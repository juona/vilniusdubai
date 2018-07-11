import { combineReducers } from 'redux';
import { TOGGLE_TAG, REQUEST_TAGS, RECEIVE_TAGS, REQUEST_PHOTOS, RECEIVE_PHOTOS } from "./actions";

const selectedTags = function(state = new Set(), action) {
	switch (action.type) {
		case TOGGLE_TAG:
			let stateCopy = new Set(state);
			let tagName = action.payload.tagName;
			stateCopy.has(tagName) ? stateCopy.delete(tagName) : stateCopy.add(tagName);
			return stateCopy;
		default:
			return state;
	}
}


const photos = function(state = {
	isFetching: false,
	items: {}
}, action) {
	switch (action.type) {
		case REQUEST_PHOTOS:
			return Object.assign({}, state, {
		        isFetching: true
		    });
		case RECEIVE_PHOTOS:
			return {
				isFetching: false,
				items: action.payload.photos
			};
		default:
			return state;
	}
}

const tagNames = function(state = {
	isFetching: false,
	items: []
}, action) {
	switch (action.type) {
		case REQUEST_TAGS:
			return Object.assign({}, state, {
		        isFetching: true
		    });
		case RECEIVE_TAGS:
			return {
				isFetching: false,
				items: action.payload.tagNames
			};
		default:
			return state;
	}
	return state;
}

export default combineReducers({
	selectedTags,
	photos,
	tagNames
});

/*
	State structure

	{
		selectedTags: Set,
		photos: {
			isFetching: false,
			items: {
				_photoName_: {
					photoName: _photoName_,
					tags: [_tag1_, _tag2_]
				}
			}
		},
		tagNames: {
			isFetching: false,
			items: [_tag1_, _tag2_, _tag3_]
		}
	}
*/