import React from 'react';
import * as rtl from '@testing-library/react';
import CompanyReviewCardDetails from './CompanyReviewCardDetails';
import '@testing-library/jest-dom/extend-expect';
import { renderWithRedux } from '../../../utils/testingHelpers';

beforeEach(rtl.cleanup);

describe('CompanyReviewCardDetails', () => {
  it('renders without crashing', () => {
    renderWithRedux(<CompanyReviewCardDetails />);
  });
  it('renders correctly', () => {
    expect(
      renderWithRedux(<CompanyReviewCardDetails />).baseElement
    ).toMatchSnapshot();
  });
})