import { DISPLAY_FATAL_ERROR } from "../../actions";

export const fatalError = function(state = "", action) {
	switch (action.type) {
		case DISPLAY_FATAL_ERROR:
			return action.payload.message;
		default:
			return state;
	}
};