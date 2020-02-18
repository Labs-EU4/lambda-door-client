import * as types from '../types';

const initialState = {
  isFetching: false,
  reviews: {
    company: [],
    salary: [],
    interview: [],
  },
};

export const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_COMPANY_REVIEWS:
    case types.GET_SALARY_REVIEWS:
    case types.GET_INTERVIEW_REVIEWS:
      return { ...state, isFetching: true };

    case types.GET_COMPANY_REVIEWS_SUCCESS:
      return {
        ...state,
        reviews: {
          ...state.reviews,
          company: action.payload,
        },
        isFetching: false,
      };

    case types.ADD_COMPANY_REVIEW_SUCCESS:
      return {
        ...state,
        reviews: {
          ...state.reviews,
          company: [...state.reviews.company, action.payload],
        },
      };

    case types.DELETE_COMPANY_REVIEWS_SUCCESS:
      return {
        ...state,
        reviews: {
          ...state.reviews,
          company: state.reviews.company.filter(
            elem => elem.id !== action.payload
          ),
        },
      };

    case types.UPDATE_COMPANY_REVIEWS_SUCCESS:
      return {
        ...state,
        reviews: {
          ...state.reviews,
          company: state.reviews.company.map(elem => {
            return elem.id === action.payload.id ? action.payload : elem;
          }),
        },
      };

    case types.ADD_SALARY_REVIEW_SUCCESS:
      return {
        ...state,
        reviews: {
          ...state.reviews,
          salary: [...state.reviews.salary, action.payload],
        },
      };

    case types.GET_SALARY_REVIEWS_SUCCESS:
      return {
        ...state,
        reviews: {
          ...state.reviews,
          salary: action.payload,
        },
        isFetching: false,
      };

    case types.DELETE_SALARY_REVIEWS_SUCCESS:
      return {
        ...state,
        reviews: {
          ...state.reviews,
          salary: state.reviews.salary.filter(
            elem => elem.id !== action.payload
          ),
        },
      };

    case types.UPDATE_SALARY_REVIEWS_SUCCESS:
      return {
        ...state,
        reviews: {
          ...state.reviews,
          salary: state.reviews.salary.map(elem => {
            return elem.id === action.payload.id ? action.payload : elem;
          }),
        },
      };

    case types.ADD_INTERVIEW_REVIEW_SUCCESS:
      return {
        ...state,
        reviews: {
          ...state.reviews,
          interview: [...state.reviews.interview, action.payload],
        },
      };

    case types.GET_INTERVIEW_REVIEWS_SUCCESS:
      return {
        ...state,
        reviews: {
          ...state.reviews,
          interview: action.payload,
        },
        isFetching: false,
      };

    case types.DELETE_INTERVIEW_REVIEW_SUCCESS:
      return {
        ...state,
        reviews: {
          ...state.reviews,
          interview: state.reviews.interview.filter(
            elem => elem.id !== action.payload
          ),
        },
      };

    case types.UPDATE_INTERVIEW_REVIEW_SUCCESS:
      return {
        ...state,
        reviews: {
          ...state.reviews,
          interview: state.reviews.interview.map(elem => {
            return elem.id === action.payload.id ? action.payload : elem;
          }),
        },
      };

    case types.GET_COMPANY_REVIEWS_FAILURE:
    case types.GET_SALARY_REVIEWS_FAILURE:
    case types.GET_INTERVIEW_REVIEWS_FAILURE:
      return { ...state, isFetching: false };

    default:
      return state;
  }
};

export const reviewsError = (state = null, action) => {
  switch (action.type) {
    case types.GET_COMPANY_REVIEWS_FAILURE:
    case types.GET_SALARY_REVIEWS_FAILURE:
    case types.GET_INTERVIEW_REVIEWS_FAILURE:
      return action.payload;
    case types.GET_COMPANY_REVIEWS:
    case types.GET_SALARY_REVIEWS:
    case types.GET_INTERVIEW_REVIEWS:
      return null;
    case types.GET_COMPANY_REVIEWS_SUCCESS:
    case types.GET_SALARY_REVIEWS_SUCCESS:
    case types.GET_INTERVIEW_REVIEWS_SUCCESS:
      return null;
    default:
      return state;
  }
};
