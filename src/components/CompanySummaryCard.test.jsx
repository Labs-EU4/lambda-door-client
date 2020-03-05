import React from 'react';
import * as rtl from '@testing-library/react';
import CompanySummaryCard from './CompanySummaryCard';
import '@testing-library/jest-dom/extend-expect';
import { renderWithRedux } from '../utils/testingHelpers';

beforeEach(rtl.cleanup);

describe('DetailedReviewCard', () => {
  it('renders without crashing', () => {
    renderWithRedux(<CompanySummaryCard />);
  });

  it('renders correctly', () => {
    expect(
      renderWithRedux(<CompanySummaryCard />).baseElement
    ).toMatchSnapshot();
  });
});