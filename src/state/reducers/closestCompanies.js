import * as types from '../types';

const initialState = {
  isFetching: false,
  closestCompanies: [],
};
// eslint-disable-next-line import/prefer-default-export
export const closestCompaniesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CLOSEST_COMPANIES:
      return { ...state, isFetching: true };
    case types.GET_CLOSEST_COMPANIES_SUCCESS:
      return {
        isFetching: false,
        closestCompanies: action.payload,
      };
    case types.GET_CLOSEST_COMPANIES_FAILURE:
      return { ...state, isFetching: false };
    default:
      return state;
  }
};
