import '@testing-library/jest-dom/extend-expect';
import { interestReducer, userInterestReducer } from '../interests';
import * as actions from '../../types';

const initialState = {
  isLoading: false,
  interests: [],
};

const testInterests = [
  {
    id: 1,
    interest: 'full stack',
  },
  {
    id: 2,
    interest: 'front end',
  },
];

const newInterest = {
  id: 3,
  interest: 'back end',
};

describe('interestReducer', () => {
  it('should return the correct initial state', () => {
    expect(interestReducer(undefined, {})).toEqual(initialState);
  });
  it('should handle GET_INTERESTS', () => {
    const startAction = {
      type: actions.GET_INTERESTS,
    };
    expect(interestReducer(initialState, startAction)).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('should handle GET_INTERESTS_SUCCESS', () => {
    const startAction = {
      type: actions.GET_INTERESTS_SUCCESS,
      payload: testInterests,
    };
    expect(interestReducer(initialState, startAction)).toEqual({
      ...initialState,
      interests: testInterests,
    });
  });

  it('should handle GET_INTERESTS_FAILURE', () => {
    const startAction = {
      type: actions.GET_INTERESTS_FAILURE,
    };
    expect(interestReducer(initialState, startAction)).toEqual({
      ...initialState,
      isLoading: false,
    });
  });
});

describe('userInterestReducer', () => {
  it('should return the correct initial state', () => {
    expect(userInterestReducer(undefined, {})).toEqual(initialState);
  });
  it('should handle GET_USER_INTERESTS', () => {
    const startAction = {
      type: actions.GET_USER_INTERESTS,
    };
    expect(userInterestReducer(initialState, startAction)).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('should handle GET_USER_INTERESTS_SUCCESS', () => {
    const startAction = {
      type: actions.GET_USER_INTERESTS_SUCCESS,
      payload: testInterests,
    };
    expect(userInterestReducer(initialState, startAction)).toEqual({
      ...initialState,
      interests: testInterests,
    });
  });

  it('should handle GET_USER_INTERESTS_FAILURE', () => {
    const startAction = {
      type: actions.GET_USER_INTERESTS_FAILURE,
    };
    expect(userInterestReducer(initialState, startAction)).toEqual({
      ...initialState,
      isLoading: false,
    });
  });
  it('should handle DELETE_INTEREST', () => {
    const startAction = {
      type: actions.DELETE_INTEREST,
      payload: newInterest,
    };
    expect(userInterestReducer(initialState, startAction)).toEqual({
      ...initialState,
    });
  });
  it('should handle ADD_INTEREST', () => {
    const startAction = {
      type: actions.ADD_INTEREST,
      payload: newInterest,
    };
    expect(userInterestReducer(initialState, startAction)).toEqual({
      ...initialState,
      interests: newInterest,
    });
  });
});
