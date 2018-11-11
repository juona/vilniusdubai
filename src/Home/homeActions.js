import history from "../Router/history";

export const SELECT_COUNTRY = Symbol("SELECT_COUNTRY");
export const selectCountry = countryName => ({
  type: SELECT_COUNTRY,
  payload: {
    countryName
  }
});
