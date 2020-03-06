import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { SmallReviewCard } from './SmallReviewCard';

const testReview = {
  id: 1,
  text: 'review',
  name: 'name',
};

const historyMock = { push: jest.fn() };

afterEach(cleanup);

describe('Tests for SmallReviewCard ', () => {
  test('renders component', () => {
    const { getByText } = render(
      <SmallReviewCard review={testReview} history={historyMock} />
    );

    expect(getByText('review')).toBeTruthy();
    expect(getByText('name')).toBeTruthy();
  });
});
