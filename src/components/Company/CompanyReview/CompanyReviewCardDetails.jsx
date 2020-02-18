//* eslint-disable react/self-closing-comp */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-wrap-multilines */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Rate, Card, Icon, Button, Skeleton } from 'antd';
import styled from 'styled-components';
import { getReviewsByReviewId } from '../../../state/actions/reviews';
import { mobilePortrait, tabletPortrait } from '../../../styles/theme.styles';
import ContactReviewer from '../../ContactReviewerModal';

const CompanyReviewCardDetailed = ({
  props,
  history,
  getReviewsByReviewId,
  singleReview: {
    isFetching,
    reviews: { companyReview: singleCompanyReview },
  },
  singleCompanyReviews: {
    reviews: { companyReview },
  },
}) => {
  const reviewId = useParams().id;
  const review =
    companyReview.find(elem => elem.id === Number(reviewId)) ||
    singleCompanyReview;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!Object.keys(review).length) {
      getReviewsByReviewId(reviewId);
    }
  }, []);
  return !review ? (
    <Skeleton />
  ) : (
    <>
      <ContactReviewer
        loading={loading}
        setLoading={setLoading}
        open={open}
        setOpen={setOpen}
        email={review.email_address}
      />

      <Button
        style={{
          marginBottom: '30px',
          border: '1px solid #BB1333',
          color: '#BB1333',
        }}
        onClick={() => history.push(`/company-page/${review.company_id}`)}
      >
        <Icon type="left" />
        Back to Reviews
      </Button>
      <StyledCard>
        <h2 className="company-name">{review.name}</h2>
        <h3>
          &quot;
          {review.review_headline}
          &quot;
        </h3>
        <p>
          Review:
          <br />
          <span className="review-div">{review.review}</span>
        </p>
        <div className="stars">
          Rating:
          <br />
          {!isFetching ? (
            <Rate disabled defaultValue={review.ratings} size="small" />
          ) : null}
        </div>
        <div className="bottom">
          <div className="contact">
            {review.is_accepting_questions ? (
              <>
                <p>
                  Have questions? &nbsp;&nbsp;
                  <Button onClick={() => setOpen(true)}> Contact Me</Button>
                </p>
              </>
            ) : (
              ''
            )}
          </div>
          <div className="username">{review.full_name}</div>
        </div>
      </StyledCard>
    </>
  );
};

const StyledCard = styled(Card)`
  max-width: 800px;
  padding: 20px 50px 50px 50px !important;

  h3 {
    text-align: center;
  }

  @media ${mobilePortrait} {
    padding: 0 !important;
  }

  @media ${tabletPortrait} {
    padding: 0 !important;
  }

  p {
    font-size: 15px;
  }
  .company-name {
    font-size: 2rem;
    text-align: center;
    margin: 0;
    margin-bottom: 20px;
    font-weight: 1000px;
  }
  .review-div {
    font-size: 20px;
  }
  .username {
    padding-top: 2rem;
    text-align: right;
    justify-content: flex-end;
  }

  .bottom {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
    padding-top: 2rem;
  }

  @media only screen and (max-width: 550px) {
    .company-name {
      font-size: 1.5rem;
    }
    p {
      font-size: 12px;
    }
    .review-div {
      font-size: 15px;
    }
    .start {
      font-size: 12px;
    }
    padding: 10px 10px 10px 5px !important;
  }
`;

export default connect(state => state, {
  getReviewsByReviewId,
})(CompanyReviewCardDetailed);
