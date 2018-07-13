import { REQUEST_PHOTOS, RECEIVE_PHOTOS } from "./photosActions";

export const photos = function(
	state = {
		isFetching: false,
		hasMoreItems: true,
		items: {}
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
				items: Object.assign({}, state.items, action.payload.photos),
				hasMoreItems: action.payload.hasMoreItems
			};
		default:
			return state;
	}
};