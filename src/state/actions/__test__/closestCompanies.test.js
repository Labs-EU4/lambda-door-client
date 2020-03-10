import React from 'react';
import * as rtl from '@testing-library/react';
import configureStore from 'redux-mock-store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import * as types from '../../types/index';

import { getClosestCompanies } from '../closestCompanies';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const mock = new MockAdapter(axios);

const closestCompanies = [
  {
    average_rating: '5.0000000000',
    description:
      'Improving Lives and Communities. Simplifying Healthcare. Expecting More.',
    id: 2,
    latitude: 33.8,
    longitude: -84.5,
    name: 'Anthem, Inc.',
    website: 'https://www.antheminc.com',
  },
];

afterEach(rtl.cleanup);
let wrapper;
beforeEach(() => {
  wrapper = rtl.render;
});

describe('Action/types for Closest companies', () => {
  it('should execute get closest companies', async () => {
    const store = mockStore({});
    const actions = store.getActions();

    await store.dispatch(getClosestCompanies());
    expect(actions[0]).toEqual({
      type: types.GET_CLOSEST_COMPANIES,
    });
  });
  it('Should return an array of the closest companies', async () => {
    await mock.onGet().reply(200, closestCompanies);
    const expectedActions = {
      type: types.GET_CLOSEST_COMPANIES_SUCCESS,
      payload: closestCompanies,
    };
    const store = mockStore({});
    const actions = store.getActions();
    await store.dispatch(getClosestCompanies());
    expect(actions[1]).toEqual(expectedActions);
  });
  it('should execute fetch error', async () => {
    const code = 404;
    await mock.onGet().reply(code);
    const expectedActions = {
      type: types.GET_CLOSEST_COMPANIES_FAILURE,
      payload: `Request failed with status code ${code}`,
    };
    const store = mockStore({});
    const actions = store.getActions();
    await store.dispatch(getClosestCompanies());
    expect(actions[1]).toEqual(expectedActions);
  });
});
