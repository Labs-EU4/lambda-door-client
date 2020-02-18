import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithRedux } from '../../../utils/testingHelpers';
import ConnectedUserDashboard from '../UserDashboard';

const historyMock = { push: jest.fn() };

describe('ConnectedUserDashboard', () => {
  it('renders without crashing', () => {
    renderWithRedux(<ConnectedUserDashboard history={historyMock} />);
  });
  it('renders correctly', () => {
    expect(
      renderWithRedux(<ConnectedUserDashboard history={historyMock} />)
        .baseElement
    ).toMatchSnapshot();
  });

  it('should render correctly if user has authenticated', () => {
    const storage = {
      getItem(key) {
        return localStorage.getItem(key);
      },
      setItem(key, value) {
        localStorage.setItem(key, value);
      },
    };
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('code', '12345678');

    storage.setItem(
      'token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiaWF0IjoxNTc4NTY4NTgxfQ.6cR-MJGGZRHgszj1o1IgvyXfhEla3NYNegRT7aafXps'
    );

    renderWithRedux(<ConnectedUserDashboard history={historyMock} />);
  });
});
