import React from 'react';
import * as rtl from '@testing-library/react';
import SalaryReviewDetails from './SalaryReviewDetails';
import '@testing-library/jest-dom/extend-expect';
import { renderWithRedux } from '../../../utils/testingHelpers';

beforeEach(rtl.cleanup);

describe('SalaryReviewDetails', () => {
  it('renders without crashing', () => {
    renderWithRedux(<SalaryReviewDetails />);
  });

  it('renders correctly', () => {
    expect(
      renderWithRedux(<SalaryReviewDetails />).baseElement
    ).toMatchSnapshot();
  });
})