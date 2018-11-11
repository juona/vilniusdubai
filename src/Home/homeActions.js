import history from "../Router/history";

export const SELECT_COUNTRY = Symbol("SELECT_COUNTRY");
export const selectCountry = countryName =>
  function(dispatch) {
		history.push("/photos");
    dispatch({
      type: SELECT_COUNTRY,
      payload: {
        countryName
      }
    });
  };
