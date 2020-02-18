/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable camelcase */
import React from 'react';
import { Card } from 'antd';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import currencies from '../../../utils/currencies';

const StyledCard = styled(Card)`
  margin: 1.5rem !important;
  margin-left: 0 !important;
  width: 270px;
  height: 200px;
  cursor: pointer;

  &:hover {
    border: 2px solid #bb1333;
  }

  .card-top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.8rem;
    height: 60px;
    h2 {
      margin-bottom: 0;
      padding-top: 35px !important;
      font-size: 20px;
      font-weight: 900;

      &:hover {
        opacity: 0.6;
      }
      &:active {
        transform: scale(1.05);
      }
    }
  }

  .description {
    padding-top: 1rem;
  }
`;

export const SmallSalaryReviewCard = ({
  history,
  review: { id, name, description, salary, currency, company_id },
}) => {
  const currencyUnit = currencies.find(curr => curr.name === currency).symbol;
  const salaryFormatted = `${currencyUnit}${Number(salary)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
  const handleCompanyClick = e => {
    e.stopPropagation();
    history.push(`/company-page/${company_id}`);
  };
  return (
    <StyledCard onClick={() => history.push(`/reviews/salary/${id}`)}>
      <div className="card-top">
        <h2 onClick={handleCompanyClick}>{name}</h2>
      </div>
      <div>{salaryFormatted} /yr</div>
      <div className="description">
        {description.length > 30 ? (
          <span>{description.slice(0, 30)}...</span>
        ) : (
          <span>{description}</span>
        )}
      </div>
    </StyledCard>
  );
};

export default withRouter(SmallSalaryReviewCard);
