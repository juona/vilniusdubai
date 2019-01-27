import {
	REQUEST_GOOGLE_MAPS_LIB,
	RECEIVE_GOOGLE_MAPS_LIB
} from "./mapActions";

export const googleMaps = function(
  state = {
    isFetching: false,
    lib: null
  },
  action
) {
  switch (action.type) {
    case REQUEST_GOOGLE_MAPS_LIB:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_GOOGLE_MAPS_LIB:
      return {
        isFetching: false,
        lib: window.google
      };
    default:
      return state;
  }
};