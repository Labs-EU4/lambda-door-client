import * as types from '../types';

const initialState = {
  isFetching: false,
  reviews: {
    companyReview: [],
    interviewReview: [],
  },
};

const singleReviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_SINGLE_REVIEWS:
    case types.GET_SINGLE_INTERVIEW_REVIEWS:
      return { ...state, isFetching: true };

    case types.GET_SINGLE_REVIEWS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        reviews: {
          ...state.reviews,
          companyReview: action.payload,
        },
      };

    case types.GET_SINGLE_INTERVIEW_REVIEWS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        reviews: {
          ...state.reviews,
          interviewReview: action.payload,
        },
      };

    case types.GET_SINGLE_REVIEWS_FAILURE:
    case types.GET_SINGLE_INTERVIEW_REVIEWS_FAILURE:
      return { ...state, isFetching: false };

    default:
      return state;
  }
};

export default singleReviewsReducer;
