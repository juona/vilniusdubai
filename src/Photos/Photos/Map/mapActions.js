// NOTE Too much hassle returning this key from the server.
// And since it is UI code anyway, it does not really matter.
const API_KEY = "AIzaSyAgfJ2OJacwQir3gn-qh_RCYA7Ni4ngZw8";
const MAPS_API_URL = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;

export const REQUEST_GOOGLE_MAPS_LIB = Symbol("REQUEST_GOOGLE_MAPS_LIB");
const requestGoogleMapsLib = () => ({
  type: REQUEST_GOOGLE_MAPS_LIB
});

export const RECEIVE_GOOGLE_MAPS_LIB = Symbol("RECEIVE_GOOGLE_MAPS_LIB");
const receiveGoogleMapsLib = () => ({
  type: RECEIVE_GOOGLE_MAPS_LIB
});

export const FETCH_GOOGLE_MAPS_LIB = Symbol("FETCH_GOOGLE_MAPS_LIB");
export const fetchGoogleMapsLib = () => dispatch => {
  dispatch(requestGoogleMapsLib());
  if (window.google) {
    dispatch(receiveGoogleMapsLib());
  } else {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = MAPS_API_URL;
    document.body.appendChild(script);
    script.addEventListener("load", () => dispatch(receiveGoogleMapsLib()));
  }
};
