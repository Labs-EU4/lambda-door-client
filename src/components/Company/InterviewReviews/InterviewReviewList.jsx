/* eslint-disable react/jsx-curly-newline */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Card, Empty, Button } from 'antd';
import styled from 'styled-components';
import { mobilePortrait, tabletPortrait } from '../../../styles/theme.styles';

const ReviewCard = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const StyledEmpty = styled.div`
  display: flex;
  justify-content: center;
  height: 40vh;
  align-items: center;
  .text {
    font-size: 20px;
  }
`;

const StyledCard = styled(Card)`
  margin: 2rem 1.5rem 1rem 0rem !important;
  width: 280px;
  height: 180px;
  padding-top: 0.5rem !important;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    border: 2px solid #bb1333;
  }

  .stars {
    margin-top: 30px;
    font-size: 14px;
  }

  @media ${mobilePortrait} {
    padding: 0 !important;
  }
  @media ${tabletPortrait} {
    padding: 0 !important;
  }
`;
const ReviewerName = styled.div`
  text-align: right;
`;

const InterviewReviewList = ({
  history,
  singleCompanyReviews: {
    reviews: { interviewReview },
  },
}) => {
  return interviewReview.length === 0 ? (
    <StyledEmpty>
      <Empty
        image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
        imageStyle={{
          height: 60,
        }}
        description={
          <span className="text">
            No review found yet, perhaps none has been given.
          </span>
        }
      >
        <Link to={{ pathname: '/add-review', state: 2 }}>
          <Button>Post a Review</Button>
        </Link>
      </Empty>
    </StyledEmpty>
  ) : (
    <ReviewCard>
      {interviewReview.map(interviewReview => (
        <StyledCard
          key={interviewReview.id}
          onClick={() =>
            history.push(`/interviewreviews/${interviewReview.id}`)
          }
        >
          <p>
            {interviewReview.text.length > 100 ? (
              <span>
                {interviewReview.text.slice(0, 100)}
                ...
              </span>
            ) : (
              <span>{interviewReview.text}</span>
            )}
          </p>
          <ReviewerName>{interviewReview.full_name}</ReviewerName>
        </StyledCard>
      ))}
    </ReviewCard>
  );
};
export default withRouter(connect(state => state)(InterviewReviewList));
