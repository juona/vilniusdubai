const DEFAULT_ERROR_MESSAGE = "Server Error!";

export const DISPLAY_FATAL_ERROR = Symbol("DISPLAY_FATAL_ERROR");
export const displayFatalError = (message) => ({
	type: DISPLAY_FATAL_ERROR,
	payload: {
		message: message || DEFAULT_ERROR_MESSAGE
	}
});