/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Card, Empty, Button } from 'antd';
import { withRouter, useParams, Link } from 'react-router-dom';
import currencies from '../../../utils/currencies';

const SalaryReviewsList = ({
  singleCompanyReviews: {
    reviews: { salaryReview },
  },
  history,
}) => {
  const { id } = useParams();
  return !salaryReview.length ? (
    <StyledEmpty>
      <Empty
        image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
        imageStyle={{
          height: 60,
        }}
        description={
          <span className="text">
            Oops!! <br />
            No salary reviews yet
          </span>
        }
      >
        <Link to={{ pathname: '/add-review', state: 1 }}>
          <Button>Post a Review</Button>
        </Link>
      </Empty>
    </StyledEmpty>
  ) : (
    <ReviewCard>
      {salaryReview.map(elem => {
        const currencyUnit = currencies.find(
          curr => curr.name === elem.currency
        ).symbol;
        const salaryFormatted = `${currencyUnit}${Number(elem.salary)
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
        return (
          <StyledCard
            key={elem.id}
            onClick={() => history.push(`/company/${id}/salary/${elem.id}`)}
          >
            <div className="card-top">
              <h2>{elem.name}</h2>
            </div>
            <h2>{elem.interest}</h2>

            <h3>{salaryFormatted} /yr</h3>
            <ReviewerName>
              {elem.is_anonymous ? 'Anonymous User' : elem.full_name}
            </ReviewerName>
          </StyledCard>
        );
      })}
    </ReviewCard>
  );
};

const ReviewCard = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /* justify-content: space-between; */
`;

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
    height: 60px;
    h2 {
      margin-bottom: 0;
      padding-top: 20px !important;
      font-size: 20px;
      font-weight: 900;
    }
  }
`;

const StyledEmpty = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  height: 40vh;
  align-items: center;
  .text {
    font-size: 20px;
  }
`;

const ReviewerName = styled.div`
  text-align: right;
  margin-bottom: 1rem;
`;

export default withRouter(connect(state => state)(SalaryReviewsList));
