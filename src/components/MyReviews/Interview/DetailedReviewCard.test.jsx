import React from 'react';
import * as rtl from '@testing-library/react';
import DetailedReviewCard from './DetailedReviewCard';
import '@testing-library/jest-dom/extend-expect';
import { renderWithRedux } from '../../../utils/testingHelpers';

beforeEach(rtl.cleanup);

describe('DetailedReviewCard', () => {
  it('renders without crashing', () => {
    renderWithRedux(<DetailedReviewCard />);
  });

  it('renders correctly', () => {
    expect(
      renderWithRedux(<DetailedReviewCard />).baseElement
    ).toMatchSnapshot();
  });
});