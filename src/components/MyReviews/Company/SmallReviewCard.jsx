/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable camelcase */
import React from 'react';
import { Card, Rate } from 'antd';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

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
      transition: 1s hover;
      &:hover {
        opacity: 0.6;
      }
      &:active {
        transform: scale(1.05);
      }
    }
  }

  .stars {
    margin-top: 20px;
    font-size: 10px;
  }
`;

export const SmallReviewCard = ({
  history,
  review: { id, review_headline: review, ratings, name, company_id },
}) => {
  const handleCompanyClick = e => {
    e.stopPropagation();
    history.push(`/company-page/${company_id}`);
  };
  return (
    <StyledCard onClick={() => history.push(`/reviews/company/${id}`)}>
      <div className="card-top">
        <h2 role="link" onClick={handleCompanyClick}>
          {name}
        </h2>
      </div>
      {review.length > 30 ? (
        <span>{review.slice(0, 30)}...</span>
      ) : (
        <span>{review}</span>
      )}
      <div className="stars">
        <Rate disabled defaultValue={ratings} size="small" />
      </div>
    </StyledCard>
  );
};

export default withRouter(SmallReviewCard);
