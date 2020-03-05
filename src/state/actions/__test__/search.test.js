import React from 'react';
import * as rtl from '@testing-library/react';
import configureStore from 'redux-mock-store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import * as types from '../../types/index';

import getSearchResults from '../search';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const mock = new MockAdapter(axios);

const request = {
  search_query: 'Paystack',
  search_category: 'salaries',
};

const searchResult = [
  {
    id: 10,
    user_id: 3,
    company_id: 10,
    text: null,
    description:
      'Paystack helps businesses in Africa get paid by anyone, anywhere in the world',
    salary: 3000000,
    currency: 'Nigerian Naira',
    is_accepting_questions: true,
    is_current_employee: true,
    job_title: 'Junior Developer',
    is_anonymous: false,
    interest: 'Software Engineer',
    name: 'Paystack',
    website: 'https://paystack.com/',
    location: 'Lagos, NG',
    longitude: -80,
    latitude: 31,
    type: 'FinTech',
    logo: '',
  },
];

const url = `${process.env.REACT_APP_BACKEND_URL}/search/${request.search_category}`;

afterEach(rtl.cleanup);
beforeEach(rtl.cleanup);

describe('Action for getting search results', () => {
  it('should execute getSearchResults', async () => {
    const store = mockStore({});
    const actions = store.getActions();

    await store.dispatch(getSearchResults());
    expect(actions[0]).toEqual({
      type: types.SEARCH,
    });
  });

  it('should return an array of the exact search parameters', async () => {
    await mock
      .onGet(url, { params: { search_query: request.search_query } })
      .reply(200, searchResult);

    const expectedActions = {
      type: types.SEARCH_SUCCESS,
      payload: [searchResult, request.search_category, request.search_query],
    };
    const store = mockStore({});
    const actions = store.getActions();
    await store.dispatch(getSearchResults(request));
    expect(actions[1]).toEqual(expectedActions);
  });

  it('should execute fetch error', async () => {
    const code = 404;
    await mock.onGet(url).reply(code);

    const store = mockStore({});
    const actions = store.getActions();
    await store.dispatch(getSearchResults());
    expect(actions[1].type).toEqual('SEARCH_FAILURE');
  });
});
