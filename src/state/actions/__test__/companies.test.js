import React from 'react';
import * as rtl from '@testing-library/react';
import configureStore from 'redux-mock-store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import * as types from '../../types/index';

import { getCompanies, addCompany } from '../companies';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const mock = new MockAdapter(axios);

const testCompanies = [
  {
    id: 1,
    name: 'Accenture',
    website: 'www.accenture.com.',
    location: 'Atlanta, GA',
    type: 'Business',
    logo: '',
    description: '',
    created_at: null,
    updated_at: null,
    latitude: 33.7537,
    longitude: -85,
    average_rating: '4.00000000000000000000',
  },
];

const testNewCompany = {
  name: 'Accenture',
  website: 'www.accenture.com.',
  location: 'Atlanta, GA',
  longitude: -85.0,
  latitude: 33.7537,
  type: 'Business',
  logo: '',
  description: '',
};

afterEach(rtl.cleanup);
let wrapper;
beforeEach(
  rtl.cleanup
  //   () => {
  //   wrapper = rtl.render;
  // }
);

describe('Action/types for list of companies(get)', () => {
  it('should execute get_Companies', async () => {
    const store = mockStore({});
    const actions = store.getActions();

    await store.dispatch(getCompanies());
    expect(actions[0]).toEqual({
      type: types.GET_COMPANIES,
    });
  });

  it('Should return companies array', async () => {
    await mock
      .onGet(`${process.env.REACT_APP_BACKEND_URL}/companies/`)
      .reply(200, testCompanies);

    const expectedActions = {
      type: types.GET_COMPANIES_SUCCESS,
      payload: testCompanies,
    };
    const store = mockStore({});
    const actions = store.getActions();
    await store.dispatch(getCompanies());
    expect(actions[1]).toEqual(expectedActions);
  });

  it('should execute fetch error', async () => {
    const code = 404;
    await mock
      .onGet(`${process.env.REACT_APP_BACKEND_URL}/companies/`)
      .reply(code);
    const expectedAction = {
      type: types.GET_COMPANIES_FAILURE,
      payload: `Request failed with status code ${code}`,
    };
    const store = mockStore({});
    const actions = store.getActions();
    await store.dispatch(getCompanies());
    expect(actions[1]).toEqual(expectedAction);
  });
});

describe('Action/types for adding new company(post)', () => {
  it('should execute ADD_COMPANY', async () => {
    const store = mockStore({});
    const actions = store.getActions();

    await store.dispatch(addCompany());
    expect(actions[0]).toEqual({
      type: types.ADD_COMPANY,
    });
  });

  it('Should return details of newly added company', async () => {
    const URL = `${process.env.REACT_APP_BACKEND_URL}/companies/`;
    const responseObject = {
      ...testNewCompany,
      id: 1,
    };
    await mock.onPost().reply(201, responseObject);

    const expectedActions = {
      type: types.ADD_COMPANY_SUCCESS,
      payload: responseObject,
    };
    const store = mockStore({});
    const actions = store.getActions();
    await store.dispatch(addCompany());
    expect(actions[1]).toEqual(expectedActions);

    // wrapper.debug();
  });

  it('should execute fetch error', async () => {
    const URL = `${process.env.REACT_APP_BACKEND_URL}/companies/`;
    const code = 404;
    await mock.onPost().reply(code);
    const expectedAction = {
      type: types.ADD_COMPANY_FAILURE,
      payload: `Request failed with status code ${code}`,
    };
    const store = mockStore({});
    const actions = store.getActions();
    await store.dispatch(addCompany());
    expect(actions[1]).toEqual(expectedAction);
  });
});
