import * as types from '../types';

const initialInterestState = {
  isLoading: false,
  interests: [],
};

// eslint-disable-next-line import/prefer-default-export
export const interestReducer = (state = initialInterestState, action) => {
  switch (action.type) {
    case types.GET_INTERESTS:
      return {
        ...state,
        isLoading: true
      };
    case types.GET_INTERESTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        interests: action.payload,
      };
    case types.GET_INTERESTS_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};


const initialUserInterestState = {
  isLoading: false,
  interests: [],
};
export const userInterestReducer = (state = initialUserInterestState, action) => {
  switch (action.type) {
    case types.GET_USER_INTERESTS:
      return {
        ...state,
        isLoading: true
      };
    case types.GET_USER_INTERESTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        interests: action.payload,
      };
    case types.GET_USER_INTERESTS_FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    case types.DELETE_INTEREST:
      return {
        ...state,
        interests: state.interests.filter(
          interest => interest.id !== action.payload
        ),
      };

    case types.ADD_INTEREST:
      return {
        ...state,
        interests: action.payload,
      };
    default:
      return state;
  }
};