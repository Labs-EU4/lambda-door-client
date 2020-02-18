import * as types from '../types';

const initialState = {
  isLoading: true,
  isLoggedIn: false,
  credentials: {},
  error: null,
};

// eslint-disable-next-line import/prefer-default-export
export const authState = (state = initialState, action) => {
  switch (action.type) {
    case types.LOG_IN_USER:
    case types.EDIT_PROFILE_PICTURE:
      return {
        ...state,
        isLoading: true,
      };
    case types.LOG_IN_USER_SUCCESS:
    case types.EDIT_PROFILE_PICTURE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        credentials: action.payload,
      };
    case types.LOG_IN_USER_FAILURE:
    case types.EDIT_PROFILE_PICTURE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case types.LOG_OUT_USER_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: false,
      };

    case types.LOG_OUT_USER_FAILURE:
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: true,
        error: action.payload,
      };

    default:
      return state;
  }
};
