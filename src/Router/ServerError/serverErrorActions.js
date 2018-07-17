export const DISPLAY_FATAL_ERROR = Symbol("DISPLAY_FATAL_ERROR");
export const displayFatalError = (message) => ({
	type: DISPLAY_FATAL_ERROR,
	payload: {
		message
	}
});