import React from 'react';
import * as rtl from '@testing-library/react';
import configureStore from 'redux-mock-store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import * as types from '../../types/index';
import { getInterests } from '../interests';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const mock = new MockAdapter(axios);

const interests = {
  id: 1,
  interest: 'AI Engineer',
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
});
