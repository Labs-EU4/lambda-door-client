import React from 'react';
import * as rtl from '@testing-library/react';
import DetailedSalaryReviewCard from './DetailedSalaryReviewCard';
import '@testing-library/jest-dom/extend-expect';
import { renderWithRedux } from '../../../utils/testingHelpers';

beforeEach(rtl.cleanup);

describe('DetailedSalaryReviewCard', () => {
  it('renders without crashing', () => {
    renderWithRedux(<DetailedSalaryReviewCard />);
  });

  it('renders correctly', () => {
    expect(
      renderWithRedux(<DetailedSalaryReviewCard />).baseElement
    ).toMatchSnapshot();
  });
});
