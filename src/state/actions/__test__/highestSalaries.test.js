import React from 'react';
import * as rtl from '@testing-library/react';
import configureStore from 'redux-mock-store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import * as types from '../../types/index';

import { getHighestSalary } from '../highestSalaries';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const mock = new MockAdapter(axios);

const highestSalaries = [
  {
    job_title: 'Software Engineer',
    base_salary: 98000,
    salary: 98000,
    currency: 'US Dollar',
    companyName: 'Ahalogy',
  },
  {
    job_title: 'Software Engineer',
    base_salary: 98000,
    salary: 98000,
    currency: 'US Dollar',
    companyName: 'Ahalogy',
  },
  {
    job_title: 'Software Engineer',
    base_salary: 98000,
    salary: 98000,
    currency: 'US Dollar',
    companyName: 'Ahalogy',
  },
];

afterEach(rtl.cleanup);
let wrapper;
beforeEach(() => {
  wrapper = rtl.render;
});

describe('Action/types for highest salaries', () => {
  it('should execute get highest salaries', async () => {
    const store = mockStore({});
    const actions = store.getActions();

    await store.dispatch(getHighestSalary());
    expect(actions[0]).toEqual({
      type: types.GET_HIGHEST,
    });
  });
  it('Should return highest salary array', async () => {
    await mock
      .onGet(`${process.env.REACT_APP_BACKEND_URL}/salaryreviews/highest/`)
      .reply(200, highestSalaries);
    const expectedActions = {
      type: types.GET_HIGHEST_SUCCESS,
      payload: highestSalaries,
    };
    const store = mockStore({});
    const actions = store.getActions();
    await store.dispatch(getHighestSalary());
    expect(actions[1]).toEqual(expectedActions);
  });
  it('should execute fetch error', async () => {
    const code = 404;
    await mock
      .onGet(`${process.env.REACT_APP_BACKEND_URL}/salaryreviews/highest/`)
      .reply(code);
    const expectedAction = {
      type: types.GET_HIGHEST_FAILURE,
      payload: `Request failed with status code ${code}`,
    };
    const store = mockStore({});
    const actions = store.getActions();
    await store.dispatch(getHighestSalary());
    expect(actions[1]).toEqual(expectedAction);
  });
});