import React from 'react';
import * as rtl from '@testing-library/react';
import configureStore from 'redux-mock-store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import * as types from '../../types/index';
import { getTopRatedReviews } from '../topRatedReviews';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const mock = new MockAdapter(axios);
const reviews = [
  {
    id: 5,
    name: 'DoNotPay Inc',
    description:
      'Fight corporations, beat bureaucracy and sue anyone at the press of a button.',
    average_rating: '5.0000000000000000',
  },
  {
    id: 1,
    name: 'Accenture',
    description:
      'We partner with our clients to drive real innovation—the kind that turns an idea into an industry.',
    average_rating: '4.5000000000000000',
  },
  {
    id: 10,
    name: 'Paystack',
    description:
      'Paystack helps businesses in Africa get paid by anyone, anywhere in the world',
    average_rating: '4.0000000000000000',
  },
];

afterEach(rtl.cleanup);
let wrapper;
beforeEach(() => {
  wrapper = rtl.render;
});

describe('Action/types top rated reviews', () => {
  it('should execute get top rated', async () => {
    const store = mockStore({});
    const actions = store.getActions();

    await store.dispatch(getTopRatedReviews());
    expect(actions[0]).toEqual({ type: types.GET_TOP_RATED });
  });

  it('should execute fetch top rated reviews with success', async () => {
    await mock
      .onGet(`${process.env.REACT_APP_BACKEND_URL}/companies/top`)
      .reply(200, reviews);
    const expectedActions = {
      type: types.GET_TOP_RATED_SUCCESS,
      payload: reviews,
    };
    const store = mockStore({});
    const actions = store.getActions();
    await store.dispatch(getTopRatedReviews());
    expect(actions[1]).toEqual(expectedActions);
  });

  it('should execute fetch Error data', async () => {
    const code = 404;
    await mock
      .onGet(`${process.env.REACT_APP_BACKEND_URL}/companies/top`)
      .reply(code);
    const expectedAction = {
      type: types.GET_TOP_RATED_FAILURE,
      payload: `Request failed with status code ${code}`,
    };
    const store = mockStore({});
    const actions = store.getActions();
    await store.dispatch(getTopRatedReviews());
    expect(actions[1]).toEqual(expectedAction);
  });
});
