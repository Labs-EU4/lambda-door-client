import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { SmallReviewCard } from '../SmallReviewCard';

const testReview = {
  id: 1,
  review_headline: 'Headline',
  ratings: 4,
  name: 'Company Name',
};
const historyMock = { push: jest.fn() };

afterEach(cleanup);

describe('Tests for SmallReviewCard ', () => {
  test('renders component', () => {
    const { getByText } = render(
      <SmallReviewCard review={testReview} history={historyMock} />
    );

    expect(getByText('Headline')).toBeTruthy();
    expect(getByText('Company Name')).toBeTruthy();
  });
});
