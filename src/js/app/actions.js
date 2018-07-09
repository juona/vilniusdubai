/*
 * Action types
 */

export const TOGGLE_TAG = Symbol();

/*
 * Action creators
 */

export const toggleTag = tagName => ({
	type: TOGGLE_TAG,
	payload: { tagName }
});
