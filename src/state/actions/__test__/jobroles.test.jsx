import React from 'react';
import * as rtl from '@testing-library/react';
import configureStore from 'redux-mock-store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import * as types from '../../types/index';
import { getJobRoles } from '../jobroles';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const mock = new MockAdapter(axios);

const data = [
  { interest: 'Front End', id: 1, count: 0 },
  { interest: 'Back End', id: 2, count: 0 },
  { interest: 'Full Stack', id: 3, count: 0 },
  { interest: 'Data Science', id: 4, count: 0 },
  { interest: 'Machine Learning', id: 5, count: 0 },
];

afterEach(rtl.cleanup);
let wrapper;
beforeEach(() => {
  wrapper = rtl.render;
});

describe('Action/Types for Job roles data visualixation', () => {
  it('should execute get job role data', async () => {
    const store = mockStore({});
    const actions = store.getActions();

    await store.dispatch(getJobRoles());
    expect(actions[0]).toEqual({ type: types.GET_JOB_ROLES });
  });

  // it('should execute fetch data data with success', async () => {
  //   mock.onGet('/').reply(200, data);
  //   const expectedActions = {
  //     type: types.GET_JOB_ROLES_SUCCESS,
  //     payload: data,
  //   };
  //   const store = mockStore({});
  //   const actions = store.getActions();
  //   await store.dispatch(getJobRoles());
  //   expect(actions[1]).toBe(expectedActions);
  // });

  it('should execute fetch Error data', async () => {
    const code = 404;
    mock.onGet('/').reply(code);
    const expectedAction = {
      type: types.GET_JOB_ROLES_FAILURE,
      payload: `Request failed with status code ${code}`,
    };
    const store = mockStore({});
    const actions = store.getActions();
    await store.dispatch(getJobRoles());
    expect(actions[1]).toEqual(expectedAction);
  });
});
