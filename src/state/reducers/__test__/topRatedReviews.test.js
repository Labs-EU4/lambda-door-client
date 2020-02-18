import '@testing-library/jest-dom/extend-expect';
import { topRatedReviewsReducer } from '../topRatedReviews';
import * as actions from '../../types';

const initialState = {
  isFetching: false,
  topRatedReviews: [],
};

const topRated = {
  id: 5,
  name: 'DoNotPay Inc',
  description:
    'Fight corporations, beat bureaucracy and sue anyone at the press of a button.',
  average_rating: '5.0000000000000000',
};

const error = 'An error has occured. Please try again later.';
const initialErrorState = null;

describe('topRatedReviewsReducer', () => {
  it('should return the correct initial state', () => {
    expect(topRatedReviewsReducer(undefined, {})).toEqual(initialState);
  });
  it('should handle GET_TOP_RATED', () => {
    const startAction = {
      type: actions.GET_TOP_RATED,
    };
    expect(topRatedReviewsReducer(initialState, startAction)).toEqual({
      ...initialState,
      isFetching: true,
    });
  });

  it('should handle GET_TOP_RATED_SUCCESS', () => {
    const startAction = {
      type: actions.GET_TOP_RATED_SUCCESS,
      payload: topRated,
    };
    expect(topRatedReviewsReducer(initialState, startAction)).toEqual({
      ...initialState,
      topRatedReviews: topRated,
    });
  });

  it('should handle GET_TOP_RATED_REVIEWS_FAILURE', () => {
    const startAction = {
      type: actions.GET_TOP_RATED_REVIEWS_FAILURE,
    };
    expect(topRatedReviewsReducer(initialState, startAction)).toEqual({
      ...initialState,
      isFetching: false,
    });
  });
});
