import { combineReducers } from 'redux';
import { reviewsReducer, reviewsError } from './reviews';
import { authState } from './auth';
import { interestReducer, userInterestReducer } from './interests';
import { topRatedReviewsReducer } from './topRatedReviews';
import { closestCompaniesReducer } from './closestCompanies';
import { companiesReducer } from './companies';
import { avgSalariesReducer } from './avgSalaries';
import { highestSalaryReducer } from './highestSalary';
import companyReviewsReducer from './singleCompany';
import singleReviewReducer from './singleReview';
import searchReducer from './search';
import ratesReducer from './currencyRates';
import chatReducer from './chat';

const rootReducer = combineReducers({
  reviews: reviewsReducer,
  reviewsError: reviewsError,
  authState: authState,
  allInterests: interestReducer,
  userInterests: userInterestReducer,
  topRatedReviews: topRatedReviewsReducer,
  closestCompanies: closestCompaniesReducer,
  companies: companiesReducer,
  avgSalaries: avgSalariesReducer,
  singleCompanyReviews: companyReviewsReducer,
  singleReview: singleReviewReducer,
  search: searchReducer,
  highestSalaries: highestSalaryReducer,
  currencyRates: ratesReducer,
  chatState: chatReducer,
});

export default rootReducer;
