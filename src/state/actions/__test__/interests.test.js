import React from 'react';
import * as rtl from '@testing-library/react';
import configureStore from 'redux-mock-store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import * as types from '../../types/index';
import { getUsersInterests, getInterests } from '../interests';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const mock = new MockAdapter(axios);

const interests = {
  id: 1,
  interest: 'AI Engineer',
};

const userInterests = {
  id: 5,
  interest: 'Data Science',
  user_id: 5,
};

afterEach(rtl.cleanup);
let wrapper;
beforeEach(() => {
  wrapper = rtl.render;
});

describe('Action/types interests testing', () => {
  it('should execute get interests data', async () => {
    const store = mockStore({});
    const actions = store.getActions();

    await store.dispatch(getInterests());
    expect(actions[0]).toEqual({ type: types.GET_INTERESTS });
  });

  it('should execute fetch interests data with success', async () => {
    await mock
      .onGet(`${process.env.REACT_APP_BACKEND_URL}/interests`)
      .reply(200, interests);
    const expectedActions = {
      type: types.GET_INTERESTS_SUCCESS,
      payload: interests,
    };
    const store = mockStore({});
    const actions = store.getActions();
    await store.dispatch(getInterests(1));
    expect(actions[1]).toEqual(expectedActions);
  });
  it('should execute fetch error data', async () => {
    const code = 401;
    mock.onGet(`${process.env.REACT_APP_BACKEND_URL}/interests`).reply(code);
    const expectedAction = {
      type: types.GET_INTERESTS_FAILURE,
      payload: `Request failed with status code ${code}`,
    };
    const store = mockStore({});
    const actions = store.getActions();
    await store.dispatch(getInterests(1));
    expect(actions[1]).toEqual(expectedAction);
  });
});

describe('Action/types user interests testing', () => {
  it('should execute get user interests data', async () => {
    const store = mockStore({});
    const actions = store.getActions();
    await store.dispatch(getUsersInterests());
    expect(actions[0]).toEqual({ type: types.GET_USER_INTERESTS });
  });

  it('should execute fetch user interests data with success', async () => {
    mock
      .onGet(`${process.env.REACT_APP_BACKEND_URL}/interests/user/1`)
      .reply(200, userInterests);
    const expectedActions = {
      type: types.GET_USER_INTERESTS_SUCCESS,
      payload: userInterests,
    };
    const store = mockStore({});
    await store.dispatch(getUsersInterests(1));
    const actions = store.getActions();

    expect(actions[1]).toEqual(expectedActions);
  });

  it('should execute fetch Error data', async () => {
    const code2 = 404;
    mock
      .onGet(`${process.env.REACT_APP_BACKEND_URL}/interests/user/1`)
      .reply(code2, { message: 'Request failed with status code 404' });
    const expectedAction = {
      type: types.GET_USER_INTERESTS_FAILURE,
      payload: `Request failed with status code ${code2}`,
    };
    const store = mockStore({});
    const actions = store.getActions();
    await store.dispatch(getUsersInterests());
    expect(actions[1]).toEqual(expectedAction);
  });
});
