import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import { render } from '@testing-library/react';
import thunk from 'redux-thunk';
import { createMemoryHistory } from 'history';
import rootReducer from '../state/reducers/index';

export const TestingRouter = ({
  ComponentWithRedirection,
  RedirectUrl,
  MainRoute,
}) => (
  <>
    <Route
      path={MainRoute}
      exact={true}
      render={props => {
        return <ComponentWithRedirection {...props} />;
      }}
    />
    <Route path={RedirectUrl} render={() => <div>{RedirectUrl}</div>} />
  </>
);

export const renderWithRedux = (
  component,
  {
    initialState,
    store = createStore(
      rootReducer,
      initialState,
      compose(applyMiddleware(thunk))
    ),
  } = {},
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {}
) => {
  return {
    ...render(
      <Provider store={store}>
        <Router history={history}>{component}</Router>
      </Provider>
    ),
    store,
    history,
  };
};
