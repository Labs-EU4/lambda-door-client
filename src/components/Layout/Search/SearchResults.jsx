/* eslint-disable no-nested-ternary */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Spin, Button, Icon } from 'antd';
import styled from 'styled-components';
import CompanySearchCard from './CompanySearchCard';
import SalarySearchCard from './SalarySearchCard';
import InterviewSearchCard from './InterviewSearchCard';
import {mobilePortrait} from '../../../styles/theme.styles';

const SearchResults = ({ search: { isSearching, searchResults }, history }) => {
  console.log('is searching', isSearching);
  return (
    <Container>
      <Button
        style={{
          marginBottom: '30px',
          border: '1px solid #BB1333',
          color: '#BB1333',
        }}
        onClick={() => history.goBack()}
      >
        <Icon type="left" />
        Back
      </Button>
      {searchResults[2] ? (
        <h3 className="searchResultsP">
          Showing results for &quot;
          {searchResults[2]}
          &quot;.
        </h3>
      ) : null}

      <CardContainer>
        {!isSearching && (!searchResults[0] || !searchResults[0].length) ? (
          <div>No results found.</div>
        ) : !isSearching && searchResults[1] === 'companies' ? (
          searchResults[0].map(company => (
            <CompanySearchCard
              key={company.id}
              name={company.name}
              location={company.location}
              website={company.website}
              type={company.type}
              id={company.id}
              history={history}
            />
          ))
        ) : !isSearching && searchResults[1] === 'salaries' ? (
          searchResults[0].map(salaryReview => (
            <SalarySearchCard
              key={salaryReview.id}
              name={salaryReview.name}
              salary={salaryReview.salary}
              job_title={salaryReview.job_title}
              id={salaryReview.id}
              company_id={salaryReview.company_id}
              currency={salaryReview.currency}
              history={history}
            />
          ))
        ) : !isSearching && searchResults[1] === 'interviews' ? (
          searchResults[0].map(interviewReview => (
            <InterviewSearchCard
              key={interviewReview.id}
              name={interviewReview.name}
              text={interviewReview.text}
              website={interviewReview.website}
              type={interviewReview.type}
              id={interviewReview.id}
              interest={interviewReview.interest}
              history={history}
            />
          ))
        ) : (
          <SpinContainer>
            <Spin size="large" />
          </SpinContainer>
        )}
      </CardContainer>
    </Container>
  );
};

export default withRouter(connect(state => state)(SearchResults));
const Container = styled.div`
  height: 100%;
  width: 100%;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: table-row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  height: 80%;
  width: 100%;

  .searchResultsP {
    font-weight: bold;
  }
`;

const SpinContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
