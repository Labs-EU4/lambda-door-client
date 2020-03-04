import React from 'react';
import * as rtl from '@testing-library/react';
import configureStore from 'redux-mock-store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import * as types from '../../types/index';

import { getAvgSalaries } from '../avgSalaries';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const mock = new MockAdapter(axios);

const avgSalaries = [
  {
    interest_id: 2,
    interest: 'Front End',
    currency: 'USD',
    avg: 95000,
  },
  {
    interest_id: 4,
    interest: 'Full Stack',
    currency: 'USD',
    avg: 67500,
  },
];

afterEach(rtl.cleanup);
let wrapper;
beforeEach(() => {
  wrapper = rtl.render;
});

describe('Action for average salaries', () => {
  it('should execute getAvgSalaries', async () => {
    const store = mockStore({});
    const actions = store.getActions();

    await store.dispatch(getAvgSalaries());

    expect(actions[0]).toEqual({
      type: types.GET_AVG_SALARIES,
    });
  });

  it('should return array of average salaries', async () => {
    await mock.onGet().reply(200, avgSalaries);
    // No links passed to onGet.
    //  Caused failing tests and 4 hours of headache

    const expectedAction = {
      type: types.GET_AVG_SALARIES_SUCCESS,
      payload: avgSalaries,
    };
    const store = mockStore({});
    const actions = store.getActions();
    await store.dispatch(getAvgSalaries(1));
    expect(actions[1]).toEqual(expectedAction);

    // console.log(`/***`, actions);
  });

  it('should excute fetch error', async () => {
    const statusCode = 404;
    await mock.onGet().reply(statusCode);
    const expectedAction = {
      type: types.GET_AVG_SALARIES_FAILURE,
      payload: `Request failed with status code ${statusCode}`,
    };
    const store = mockStore({});
    const actions = store.getActions();
    await store.dispatch(getAvgSalaries(1));
    expect(actions[1]).toEqual(expectedAction);
  });
});
