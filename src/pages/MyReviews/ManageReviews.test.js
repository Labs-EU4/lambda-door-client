import React from 'react';
import * as rtl from '@testing-library/react';
import ManageReviews from './ManageReviews';
import '@testing-library/jest-dom/extend-expect';
import { renderWithRedux } from '../../utils/testingHelpers';

beforeEach(rtl.cleanup);

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiaWF0IjoxNTc4NTY4NTgxfQ.6cR-MJGGZRHgszj1o1IgvyXfhEla3NYNegRT7aafXps';
global.localStorage.setItem('token', token);

const loc = { state: 1 };

describe('ManageReviews', () => {
  it('renders without crashing', () => {
    renderWithRedux(<ManageReviews location={loc} />);
  });
  it('renders correctly', () => {
    expect(
      renderWithRedux(<ManageReviews location={loc} />).baseElement
    ).toMatchSnapshot();
  });
  it('redirects in case theres no token', () => {
    // global.localStorage.setItem('token', null);
    global.localStorage.clear();
    expect(
      renderWithRedux(
        <ManageReviews location={loc} history={{ push: () => {} }} />
      ).baseElement
    ).toMatchSnapshot();
  });
});
