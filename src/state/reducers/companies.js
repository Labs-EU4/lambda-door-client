/* eslint-disable import/prefer-default-export */
import * as types from '../types';

const initialState = { isLoading: false, companies: [] };

export const companiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_COMPANIES:
    case types.ADD_COMPANY:
      return {
        ...state,
        isLoading: true,
      };

    case types.GET_COMPANIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        companies: action.payload,
      };

    case types.GET_COMPANIES_FAILURE:
    case types.ADD_COMPANY_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case types.ADD_COMPANY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        companies: [...state.companies, action.payload],
      };

    default:
      return state;
  }
};
