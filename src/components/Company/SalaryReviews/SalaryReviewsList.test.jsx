import React from 'react';
import * as rtl from '@testing-library/react';
import SalaryReviewsList from './SalaryReviewsList';
import '@testing-library/jest-dom/extend-expect';
import { renderWithRedux } from '../../../utils/testingHelpers';

beforeEach(rtl.cleanup);

describe('SalaryReviewsList', () => {
  it('renders without crashing', () => {
    renderWithRedux(<SalaryReviewsList />);
  });

  it('renders correctly', () => {
    expect(
      renderWithRedux(<SalaryReviewsList />).baseElement
    ).toMatchSnapshot();
  });
})