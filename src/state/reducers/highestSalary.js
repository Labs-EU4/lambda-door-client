import * as types from '../types';

const initialState = {
  isFetching: false,
  highestSalaries: [],
};
// eslint-disable-next-line import/prefer-default-export
export const highestSalaryReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_HIGHEST:
      return { ...state, isFetching: true };
    case types.GET_HIGHEST_SUCCESS:
      return {
        isFetching: false,
        highestSalaries: action.payload,
      };
    case types.GET_HIGHEST_FAILURE:
      return { ...state, isFetching: false };
    default:
      return state;
  }
};