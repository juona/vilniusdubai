import { DISPLAY_MORE_PHOTOS, REQUEST_PHOTOS, RECEIVE_PHOTOS } from "./photosActions";
import { TOGGLE_TAG } from "../../actions";

const PHOTO_NUMBER_INCREMENT = 25;

export const photos = function(
	state = {
		isFetching: false,
		hasMoreItems: true,
		items: []
	},
	action
) {
	switch (action.type) {
		case REQUEST_PHOTOS:
			return Object.assign({}, state, {
				isFetching: true
			});
		case RECEIVE_PHOTOS:
			return {
				isFetching: false,
				items: action.payload.tagsAndSizes,
				photosByTags: action.payload.photosByTags
			};
		default:
			return state;
	}
};

export const numberOfVisiblePhotos = function(state = PHOTO_NUMBER_INCREMENT, action) {
	switch (action.type) {
		case DISPLAY_MORE_PHOTOS:
			return state + PHOTO_NUMBER_INCREMENT;
		case TOGGLE_TAG:
			return PHOTO_NUMBER_INCREMENT;
		default:
			return state;
	}
}