import { SELECT_COUNTRY } from "./homeActions";

export const selectedCountry = (state = "", action) => {
  switch (action.type) {
    case SELECT_COUNTRY:
      return action.payload.countryName;
    default:
      return state;
  }
};
