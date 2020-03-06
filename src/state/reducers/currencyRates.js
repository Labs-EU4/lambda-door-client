
import * as types from '../types';

const initialState = {
  isSearching: false,
  currencyRates: {},
};

const ratesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CURRENCY_RATES:
      return { ...state, isSearching: true };
    case types.GET_CURRENCY_RATES_SUCCESS:
      return { isSearching: false, currencyRates: action.payload };
    case types.GET_CURRENCY_RATES_FAILURE:
      return { ...state, isSearching: false };
    default:
      return state;
  }
};

export default ratesReducer;