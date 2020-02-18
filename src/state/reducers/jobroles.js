import * as types from '../types';

const initialState = {
  isFetching: true,
  jobroles: [],
};

// eslint-disable-next-line import/prefer-default-export
export const jobrolesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_JOB_ROLES:
      return { ...state, isFetching: true };

    case types.GET_JOB_ROLES_SUCCESS:
      return {
        isFetching: false,
        jobroles: action.payload,
      };

    case types.GET_JOB_ROLES_FAILURE:
      return { ...state, isFetching: false };

    default:
      return state;
  }
};
