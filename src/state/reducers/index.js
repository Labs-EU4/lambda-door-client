import { combineReducers } from 'redux';
import { reviewsReducer, reviewsError } from './reviews';
import { authState } from './auth';
import { interestReducer, userInterestReducer } from './interests';
import { topRatedReviewsReducer } from './topRatedReviews';
import { closestCompaniesReducer } from './closestCompanies';
import { companiesReducer } from './companies';
import { jobrolesReducer } from './jobroles';
import { avgSalariesReducer } from './avgSalaries';
import companyReviewsReducer from './singleCompany';
import singleReviewReducer from './singleReview';
import searchReducer from './search';

const rootReducer = combineReducers({
  reviews: reviewsReducer,
  reviewsError: reviewsError,
  authState: authState,
  allInterests: interestReducer,
  userInterests: userInterestReducer,
  topRatedReviews: topRatedReviewsReducer,
  closestCompanies: closestCompaniesReducer,
  companies: companiesReducer,
  jobroles: jobrolesReducer,
  avgSalaries: avgSalariesReducer,
  singleCompanyReviews: companyReviewsReducer,
  singleReview: singleReviewReducer,
  search: searchReducer,
});

export default rootReducer;
