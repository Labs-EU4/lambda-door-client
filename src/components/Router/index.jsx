/* eslint-disable import/no-named-as-default */
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { decode } from 'jsonwebtoken';
import { connect } from 'react-redux';

import DashboardLayout from '../Layout/DashboardLayout';

import Home from '../../pages/Home/Home';
import UserDashboard from '../../pages/UserDashboard/UserDashboard';
import AddReview from '../../pages/AddReview/AddReview';
import CompanyPage from '../../pages/Company/CompanyPage';
import ManageReviews from '../../pages/MyReviews/ManageReviews';
import NotFound from '../../pages/NotFound';

import DetailedSalaryReview from '../MyReviews/Salary/DetailedSalaryReviewCard';
import DetailedCompanyReview from '../MyReviews/Company/DetailedReviewCard';
import DetailedInterviewReview from '../MyReviews/Interview/DetailedReviewCard';

import CompanyReview from '../Company/CompanyReview/CompanyReviewCardDetails';
import InterviewReview from '../Company/InterviewReviews/InterviewReviewDetails';
import SalaryReview from '../Company/SalaryReviews/SalaryReviewDetails';

import store from '../../state/store';
import { SetAuthenticated } from '../../state/actions/auth';
import {
  getCompanyReviews,
  getSalaryReviews,
  getInterviewReviews,
} from '../../state/actions/reviews';
import { getClosestCompanies } from '../../state/actions/closestCompanies';
import { getCompanies } from '../../state/actions/companies';
import SearchResults from '../Layout/Search/SearchResults';
import DetailedSalarySearchCard from '../Layout/Search/DetailedSalarySearchCard';
import DetailedInterviewSearchCard from '../Layout/Search/DetailedInterviewSearchCard';

const start = async () => {
  const token = localStorage.getItem('token');
  if (token) {
    const { id } = decode(token);
    await store.dispatch(SetAuthenticated(id));
    await store.dispatch(getCompanies());
    await store.dispatch(getCompanyReviews(id));
    await store.dispatch(getSalaryReviews(id));
    await store.dispatch(getInterviewReviews(id));
    await store.dispatch(getClosestCompanies(id));
  }
};
start();
// eslint-disable-next-line react/prop-types
const AppRouter = ({
  authState: {
    credentials: { isLoading },
  },
}) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <DashboardLayout path="/dashboard" component={UserDashboard} />
        <DashboardLayout path="/add-review" component={AddReview} />
        <DashboardLayout path="/company-page/:id" component={CompanyPage} />
        <DashboardLayout path="/reviews" exact component={ManageReviews} />
        <DashboardLayout
          path="/reviews/interview/:id"
          component={DetailedInterviewReview}
        />
        <DashboardLayout
          exact
          path="/reviews/company/:id"
          component={DetailedCompanyReview}
        />
        <DashboardLayout
          path="/reviews/salary/:id"
          component={DetailedSalaryReview}
        />
        <DashboardLayout path="/companyReviews/:id" component={CompanyReview} />
        <DashboardLayout
          path="/interviewreviews/:id"
          component={InterviewReview}
        />
        <DashboardLayout
          path="/company/:companyId/salary/:id"
          exact
          component={SalaryReview}
        />
        <DashboardLayout
          path="/search-results"
          exact
          component={SearchResults}
        />
        <DashboardLayout
          path="/search-results/salary/:id"
          component={DetailedSalarySearchCard}
        />
        <DashboardLayout
          path="/search-results/interview/:id"
          component={DetailedInterviewSearchCard}
        />
        <DashboardLayout component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default connect(state => state)(AppRouter);
