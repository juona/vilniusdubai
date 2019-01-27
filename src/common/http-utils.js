import { displayFatalError } from "../Router/ServerError/serverErrorActions";

export function fetchData(endpoint, requestEvent, receiveEvent) {
	return function(dispatch) {
		dispatch(requestEvent());
		return fetch(endpoint)
			.then(response => handleResponse(response, dispatch))
			.then(json => dispatch(receiveEvent(json)))
			.catch(error => console.log("Error while fetching data", error));
	};
}

function handleResponse(response, dispatch) {
	if (response.status === 500) {
		dispatch(displayFatalError());
		return Promise.reject(response);
	} else {
		return response.json();
	}
}

export default {
	fetchData
};