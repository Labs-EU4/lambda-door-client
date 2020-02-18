import '@testing-library/jest-dom/extend-expect';
import companyReviewsReducer from '../singleCompany';
import * as actions from '../../types';

const initialState = {
  isFetching: false,
  reviews: {
    companyReview: [],
    salaryReview: [],
    interviewReview: [],
  },
};

const companyReview = {
  company_id: 5,
  ratings: 4,
  is_currently_employed: true,
  review_headline: 'Great Company!',
  review:
    'I have worked here for 4 years and I enjoy coming to work everyday! There is a great company culture, the work-life balance is good and the benefits are great!',
  is_accepting_questions: true,
};

const salaryReview = {
  user_id: 1,
  company_id: 1,
  description: 'Accenture Programmer',
  salary: 95000,
  currency: 'USD',
  is_accepting_questions: 0,
};

const interviewReview = {
  user_id: 1,
  company_id: 1,
  company_name: 'Microsoft',
  text:
    'Six rounds of phone/tech interviews over a long time period. It seemed a bit scattered and could have been way more efficient. I felt like some of the interviews got repetitive. The entire process took three months and I was able to interview at another company and find a job whilst waiting to hear back.',
};

const error = 'An error has occured. Please try again later.';
const initialErrorState = null;

describe('companyReviewsReducer', () => {
  it('should return the correct initial state', () => {
    expect(companyReviewsReducer(undefined, {})).toEqual(initialState);
  });
  it('should handle GET_SINGLE_COMPANY_INTERVIEW_REVIEWS', () => {
    const startAction = {
      type: actions.GET_SINGLE_COMPANY_INTERVIEW_REVIEWS,
    };
    expect(companyReviewsReducer(initialState, startAction)).toEqual({
      ...initialState,
      isFetching: true,
    });
  });

  it('should handle GET_SINGLE_COMPANY_REVIEWS_SUCCESS', () => {
    const startAction = {
      type: actions.GET_SINGLE_COMPANY_REVIEWS_SUCCESS,
      payload: companyReview,
    };
    expect(companyReviewsReducer(initialState, startAction)).toEqual({
      ...initialState,
      reviews: {
        ...initialState.reviews,
        companyReview: companyReview,
      },
    });
  });

  it('should handle GET_SINGLE_COMPANY_INTERVIEW_REVIEWS_SUCCESS', () => {
    const startAction = {
      type: actions.GET_SINGLE_COMPANY_INTERVIEW_REVIEWS_SUCCESS,
      payload: interviewReview,
    };
    expect(companyReviewsReducer(initialState, startAction)).toEqual({
      ...initialState,
      reviews: {
        ...initialState.reviews,
        interviewReview: interviewReview,
      },
    });
  });

  it('should handle GET_SINGLE_COMPANY_SALARY_REVIEWS_SUCCESS', () => {
    const startAction = {
      type: actions.GET_SINGLE_COMPANY_SALARY_REVIEWS_SUCCESS,
      payload: salaryReview,
    };
    expect(companyReviewsReducer(initialState, startAction)).toEqual({
      ...initialState,
      reviews: {
        ...initialState.reviews,
        salaryReview: salaryReview,
      },
    });
  });

  it('should handle GET_SINGLE_COMPANY_INTERVIEW_REVIEWS_FAILURE', () => {
    const startAction = {
      type: actions.GET_SINGLE_COMPANY_INTERVIEW_REVIEWS_FAILURE,
    };
    expect(companyReviewsReducer(initialState, startAction)).toEqual({
      ...initialState,
      isFetching: false,
    });
  });
});
