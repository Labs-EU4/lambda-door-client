import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { DetailedReviewCard } from '../DetailedReviewCard';

const historyMock = { push: jest.fn() };
const deleteCompanyReview = jest.fn();
const updateCompanyReview = jest.fn();

const testReview = {
  reviews: {
    company: [
      {
        id: 8,
        ratings: 4,
        is_currently_employed: true,
        review_headline: 'Really Difficult',
        review:
          'Extremely good benefits from healthcare, PTO, and discounts. Very relaxed environment with clearly laid out expectations.',
        is_accepting_questions: false,
        name: 'Bad Rabbit',
        user_id: 6,
      },
      {
        id: 9,
        ratings: 2,
        is_currently_employed: false,
        review_headline: 'Really Difficult',
        review:
          'Extremely good benefits from healthcare, PTO, and discounts. Very relaxed environment with clearly laid out expectations.',
        is_accepting_questions: false,
        name: 'Paystack',
        user_id: 6,
      },
    ],
  },
};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: '8',
  }),
}));

afterEach(cleanup);

describe('Tests for SmallReviewCard ', () => {
  test('renders component', () => {
    const { getByText, getByTestId } = render(
      <DetailedReviewCard
        reviews={testReview}
        history={historyMock}
        updateCompanyReview={updateCompanyReview}
        deleteCompanyReview={deleteCompanyReview}
      />
    );

    expect(getByText('Really Difficult')).toBeTruthy();
    expect(getByText(/Extremely good benefits from healthcare/)).toBeTruthy();
    expect(getByTestId('4')).toBeTruthy();
    expect(getByTestId('employee - true')).toBeTruthy();
    expect(getByTestId('questions - false')).toBeTruthy();
  });
});
