import React from 'react';
import * as rtl from '@testing-library/react';
import MySalaryReviewList from './MySalaryReviewList';
import '@testing-library/jest-dom/extend-expect';
import { renderWithRedux } from '../../../utils/testingHelpers';

beforeEach(rtl.cleanup);

describe('MySalaryReviewList', () => {
  it('renders without crashing', () => {
    renderWithRedux(<MySalaryReviewList />);
  });

  it('renders correctly', () => {
    expect(
      renderWithRedux(<MySalaryReviewList />).baseElement
    ).toMatchSnapshot();
  });
});
