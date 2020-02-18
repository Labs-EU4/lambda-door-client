/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { Button, Icon, Card } from 'antd';
import { connect } from 'react-redux';
import { useParams, withRouter } from 'react-router-dom';
import styled from 'styled-components';

const DetailedInterviewSearchCard = ({
  search: { searchResults },
  history,
}) => {
  const reviewId = useParams().id;
  const review = searchResults[0].find(elem => elem.id === Number(reviewId));

  const handleCompanyClick = e => {
    e.stopPropagation();
    history.push(`/company-page/${review.company_id}`);
  };

  return (
    <InterviewCardContainer>
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
      <div>
        <div className="title-div">
          <h1 onClick={handleCompanyClick}>{review.name}</h1>
        </div>
        <div>{review.text}</div>
        <p>
          Job Type: &nbsp;
          {review.interest}
        </p>
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
      </div>
    </InterviewCardContainer>
  );
};

export default withRouter(connect(state => state)(DetailedInterviewSearchCard));

const InterviewCardContainer = styled.div`
  max-width: 500px;
  p {
    padding-top: 2rem;
  }
  h1 {
    margin-bottom: 0;
    padding-bottom: 35px !important;
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
`;
