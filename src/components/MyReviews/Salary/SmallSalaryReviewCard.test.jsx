import React from 'react';
import * as rtl from '@testing-library/react';
import { SmallSalaryReviewCard } from './SmallSalaryReviewCard';
import currencies from '../../../utils/currencies';

const testReview = {
  id: 1,
  name: 'test',
  description: 'description',
  salary: 90000,
  company_id: 1,
  currency: 'US Dollar',
};

const currencyUnit = currencies.find(curr => curr.name === testReview.currency);

const historyMock = { push: jest.fn() };

afterEach(rtl.cleanup);

describe('Tests for SmallSalaryReviewCard', () => {
  test('renders component', () => {
    const { getByText } = rtl.render(
      <SmallSalaryReviewCard
        review={testReview}
        history={historyMock}
        currency={currencyUnit}
      />
    );
    expect(getByText('test')).toBeTruthy();
    expect(getByText('description')).toBeTruthy();
  });
});
