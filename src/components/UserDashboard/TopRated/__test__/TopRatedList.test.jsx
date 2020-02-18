import React from 'react';
import * as rtl from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import { TopRatedList } from '../TopRatedList';

const getTopRatedReviews = jest.fn();
const isFetching = false;
const topRatedReviews = {
  topRatedReviews: [
    {
      user_id: 1,
      company_id: 10,
      ratings: 4,
      is_currently_employed: 1,
      review_headline: 'Great Company to work for',
      review:
        'Extremely good benefits from healthcare, PTO, and discounts. Very relaxed environment with clearly laid out expectations.',
      is_accepting_questions: 0,
    },
  ],
};
let wrapper;
beforeEach(() => {
  rtl.cleanup();
  wrapper = rtl.render(
    <Router>
      <TopRatedList
        getTopRatedReviews={getTopRatedReviews}
        isFetching={isFetching}
        topRatedReviews={topRatedReviews}
      />
    </Router>
  );
});

describe('TopRatedList', () => {
  wrapper = rtl.render(
    <Router>
      <TopRatedList
        getTopRatedReviews={getTopRatedReviews}
        isFetching={isFetching}
        topRatedReviews={topRatedReviews}
      />
    </Router>
  );
  it('renders correctly', () => {
    expect(wrapper.baseElement).toMatchSnapshot();
  });
});


