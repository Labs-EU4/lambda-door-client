import '@testing-library/jest-dom/extend-expect';
import { authState } from '../auth';
import * as actions from '../../types';

const initialState = {
  isLoading: true,
  isLoggedIn: false,
  credentials: {},
  error: null,
};

const error = 'An error has occured. Please try again later.';

describe('authState reducer', () => {
  it('should return the initial state', () => {
    expect(authState(undefined, {})).toEqual(initialState);
  });
  it('should handle EDIT_PROFILE_PICTURE', () => {
    const startAction = {
      type: actions.EDIT_PROFILE_PICTURE,
    };
    expect(authState(initialState, startAction)).toEqual({
      ...initialState,
      isLoading: true,
    });
  });
  it('should handle LOG_IN_USER', () => {
    const startAction = {
      type: actions.LOG_IN_USER,
    };
    expect(authState(initialState, startAction)).toEqual({
      ...initialState,
      isLoading: true,
    });
  });
  it('should handle LOG_IN_USER_SUCCESS', () => {
    const startAction = {
      type: actions.LOG_IN_USER_SUCCESS,
      payload: 1,
    };
    expect(authState(initialState, startAction)).toEqual({
      ...initialState,
      isLoading: false,
      isLoggedIn: true,
      credentials: 1,
    });
  });
  it('should handle EDIT_PROFILE_PICTURE_SUCCESS', () => {
    const startAction = {
      type: actions.EDIT_PROFILE_PICTURE_SUCCESS,
      payload: 1,
    };
    expect(authState(initialState, startAction)).toEqual({
      ...initialState,
      isLoading: false,
      isLoggedIn: true,
      credentials: 1,
    });
  });
  it('should handle LOG_IN_USER_FAILURE', () => {
    const startAction = {
      type: actions.LOG_IN_USER_FAILURE,
      payload: error,
    };
    expect(authState(initialState, startAction)).toEqual({
      ...initialState,
      isLoading: false,
      error: error,
    });
  });
  it('should handle EDIT_PROFILE_PICTURE_FAILURE', () => {
    const startAction = {
      type: actions.EDIT_PROFILE_PICTURE_FAILURE,
      payload: error,
    };
    expect(authState(initialState, startAction)).toEqual({
      ...initialState,
      isLoading: false,
      error: error,
    });
  });
  it('should handle LOG_OUT_USER_SUCCESS', () => {
    const startAction = {
      type: actions.LOG_OUT_USER_SUCCESS,
    };
    expect(authState(initialState, startAction)).toEqual({
      ...initialState,
      isLoggingIn: false,
      isLoggedIn: false,
    });
  });
  it('should handle LOG_OUT_USER_FAILURE', () => {
    const startAction = {
      type: actions.LOG_OUT_USER_FAILURE,
      payload: error,
    };
    expect(authState(initialState, startAction)).toEqual({
      ...initialState,
      isLoggingIn: false,
      isLoggedIn: true,
      error: error,
    });
  });
});
