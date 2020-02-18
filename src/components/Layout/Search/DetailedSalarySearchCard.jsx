import React from 'react';
import { Button, Icon, Skeleton, Card } from 'antd';
import { connect } from 'react-redux';
import { useParams, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import currencies from '../../../utils/currencies';

let salaryFormatted;

const DetailedSalarySearchCard = ({ search: { searchResults }, history }) => {
  const reviewId = useParams().id;
  const review = searchResults[0].find(elem => elem.id === Number(reviewId));

  const currencyUnit = currencies.find(curr => curr.name === review.currency)
    .symbol;
  salaryFormatted = `${currencyUnit}${Number(review.salary)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;

  const handleCompanyClick = e => {
    e.stopPropagation();
    history.push(`/company-page/${review.company_id}`);
  };

  return (
    <SalaryCardContainer>
      <Button
        style={{
          marginBottom: '30px',
          border: '1px solid #BB1333',
          color: '#BB1333',
        }}
        onClick={() => history.goBack()}
      >
        <Icon type="left" />
        Back to Results
      </Button>
      <div className="title-div">
        <h1 onClick={handleCompanyClick}>{review.name}</h1>
      </div>

      <div className="salary-div">
        <p>
          {salaryFormatted}
          /yr
        </p>
      </div>

      <div className="interest">
        <h3>Job Category</h3>
        <p>{review.interest}</p>
      </div>

      <div className="description">
        <h3>Job Description</h3>
        <p>{review.description}</p>
      </div>

      <div className="bottom">
        <div className="contact">
          {review.is_accepting_questions ? (
            <p>
              Have questions? &nbsp;
              <Button>Contact Me</Button>
            </p>
          ) : (
            ''
          )}
        </div>
        <div className="username">{review.full_name}</div>
      </div>
    </SalaryCardContainer>
  );
};

export default withRouter(connect(state => state)(DetailedSalarySearchCard));

const SalaryCardContainer = styled.div`
  div {
    margin-bottom: 2rem;
  }

  h3 {
    font-weight: bold !important;
  }
  h1 {
    margin-bottom: 0;
    padding-top: 35px !important;
    font-size: 20px;
    font-weight: 900;
    transition: 1s hover;
    &:hover {
      opacity: 0.6;
      cursor: pointer;
    }
    &:active {
      transform: scale(1.05);
    }
  }

  .salary-div {
    font-size: 1.5rem;
  }
`;
