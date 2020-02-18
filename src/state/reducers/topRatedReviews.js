import * as types from '../types';

const initialState = {
  isFetching: false,
  topRatedReviews: [],
};
// eslint-disable-next-line import/prefer-default-export
export const topRatedReviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_TOP_RATED:
      return { ...state, isFetching: true };
    case types.GET_TOP_RATED_SUCCESS:
      return {
        isFetching: false,
        topRatedReviews: action.payload,
      };
    case types.GET_TOP_RATED_FAILURE:
      return { ...state, isFetching: false };
    default:
      return state;
  }
};
