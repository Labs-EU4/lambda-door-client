import * as types from '../types';

const initialState = {
  isFetching: false,
  reviews: {
    companyReview: [],
    salaryReview: [],
    interviewReview: [],
  },
};

const companyReviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_SINGLE_COMPANY_REVIEWS:
    case types.GET_SINGLE_COMPANY_INTERVIEW_REVIEWS:
      return { ...state, isFetching: true };

    case types.GET_SINGLE_COMPANY_REVIEWS_SUCCESS:
      return {
        ...state,
        reviews: {
          ...state.reviews,
          companyReview: action.payload,
        },
      };

    case types.GET_SINGLE_COMPANY_INTERVIEW_REVIEWS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        reviews: {
          ...state.reviews,
          interviewReview: action.payload,
        },
      };

    case types.GET_SINGLE_COMPANY_SALARY_REVIEWS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        reviews: {
          ...state.reviews,
          salaryReview: action.payload,
        },
      };

    case types.GET_SINGLE_COMPANY_REVIEWS_FAILURE:
    case types.GET_SINGLE_COMPANY_INTERVIEW_REVIEWS_FAILURE:
      return { ...state, isFetching: false };

    default:
      return state;
  }
};

export default companyReviewsReducer;
