import React from 'react';
import * as rtl from '@testing-library/react';
import configureStore from 'redux-mock-store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import * as types from '../../types/index';
import { editProfile } from '../user';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const mock = new MockAdapter(axios);

afterEach(rtl.cleanup);
let wrapper;
beforeEach(() => {
  wrapper = rtl.render;
});

const backend = [
  {
    id: 1,
    name: 'Bob Smith',
    image: <img src="one.jpeg" alt="Bob's pic" />,
  },
];

// const agent = {
//   id: 1,
//   name: 'John Smith',
//   image: <img src="one.jpeg" alt="John's pic" />,
// };

describe('Action/types update testing', () => {
  it('should execute get user data data', async () => {
    const store = mockStore({});
    const actions = store.getActions();

    await store.dispatch(editProfile());
    expect(actions[0]).toEqual({ type: types.EDIT_PROFILE_PICTURE });
  });

  // it('Displays a snapshot for user testing', () => {
  //   const { asFragment } = wrapper(<editProfile />);
  //   expect(wrapper(<editProfile />).container).toMatchSnapshot();
  //   expect(asFragment()).toMatchSnapshot();
  // });

  // it('should execute fetch user data with success', async () => {
  //   const URL = `${backend}/${backend.id}`;
  //   mock.onPatch(URL).reply(200, agent);
  //   const expectedActions = {
  //     type: types.EDIT_PROFILE_PICTURE_SUCCESS,
  //     payload: agent,
  //   };
  //   const store = mockStore({});
  //   const actions = store.getActions();
  //   await store.dispatch(editProfile(agent));
  //   expect(actions[1]).toEqual(expectedActions);
  // });

  it('should execute fetch user Error data', async () => {
    const URL = `${backend}/${backend.id}`;
    const code = 404;
    mock.onPatch(URL).reply(code);
    const expectedAction = {
      type: types.EDIT_PROFILE_PICTURE_FAILURE,
      payload: `Request failed with status code ${code}`,
    };
    const store = mockStore({});
    const actions = store.getActions();
    await store.dispatch(editProfile());
    expect(actions[1]).toEqual(expectedAction);
  });
});
