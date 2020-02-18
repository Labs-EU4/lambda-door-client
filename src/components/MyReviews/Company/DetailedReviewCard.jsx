/* eslint-disable no-shadow */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';
import {
  Rate,
  Switch,
  Icon,
  Card,
  Button,
  Skeleton,
  Popconfirm,
  Typography,
} from 'antd';
import styled from 'styled-components';
import { withRouter, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  deleteCompanyReview,
  updateCompanyReview,
} from '../../../state/actions/reviews';
import openNotification from '../../../utils/openNotification';
import { mobilePortrait, tabletPortrait } from '../../../styles/theme.styles';

const { Paragraph } = Typography;
let updatedReview;

export const DetailedReviewCard = ({
  history,
  reviews: {
    reviews: { company },
  },
  deleteCompanyReview,
  updateCompanyReview,
}) => {
  const [isEditing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const reviewId = useParams().id;
  const review = company.find(elem => elem.id === Number(reviewId));

  useEffect(() => {
    updatedReview = { ...review };
    delete updatedReview.name;
    delete updatedReview.full_name;
    delete updatedReview.company_id;
    delete updatedReview.email_address;
  }, [review]);

  const handleDelete = async id => {
    await deleteCompanyReview(id);
    history.push(`/reviews/`);
    openNotification('Review deleted successfully!');
  };

  const updateReview = (key, value) => {
    updatedReview[key] = value;
  };

  const handleEdit = async () => {
    setLoading(true);
    await updateCompanyReview(updatedReview);
    setLoading(false);
    setEditing(false);
  };

  return !review ? (
    <Skeleton />
  ) : (
    <>
      <Button
        style={{
          marginBottom: '30px',
          border: '1px solid #BB1333',
          color: '#BB1333',
        }}
        onClick={() => history.push(`/reviews/`)}
      >
        <Icon type="left" />
        Back to Reviews
      </Button>
      <StyledReview>
        <div className="title-div">
          <h2>Company Name</h2>
          <span
            className="company"
            onClick={() => {
              history.push(`/company-page/${review.company_id}`);
            }}
          >
            {review.name}
          </span>
        </div>
        <div className="ratings">
          <h2>Overall Rating</h2>
          <div className="stars" data-testid={review.ratings}>
            <Rate
              disabled={!isEditing}
              defaultValue={review.ratings}
              onChange={e => updateReview('ratings', e)}
            />
          </div>
        </div>
        <div className="switch-statements">
          <div
            className="current-employee"
            data-testid={`employee - ${review.is_currently_employed}`}
          >
            <h2>I am a current employee</h2>
            <Switch
              checkedChildren={<Icon type="check" />}
              unCheckedChildren={<Icon type="close" />}
              defaultChecked={review.is_currently_employed}
              disabled={!isEditing}
              onChange={e => {
                updateReview('is_currently_employed', e === true ? 1 : 0);
              }}
            />
          </div>

          <div
            className="accepting-questions"
            data-testid={`questions - ${review.is_accepting_questions}`}
          >
            <h2>Accepting questions</h2>
            <Switch
              checkedChildren={<Icon type="check" />}
              unCheckedChildren={<Icon type="close" />}
              defaultChecked={review.is_accepting_questions}
              disabled={!isEditing}
              onChange={e => {
                updateReview('is_accepting_questions', e === true ? 1 : 0);
              }}
            />
          </div>
        </div>
        <div>
          <div className="headline-div">
            <h2>Review Headline </h2>
            <Paragraph
              editable={{
                onChange: e => {
                  updateReview('review_headline', e);
                },
                editing: isEditing,
              }}
              className="editable-text headline"
            >
              {review.review_headline}
            </Paragraph>
          </div>
          <div className="review-body">
            <h2>Review</h2>
            <Paragraph
              className="editable-text"
              editable={{
                onChange: e => {
                  updateReview('review', e);
                },
                editing: isEditing,
              }}
            >
              {review.review}
            </Paragraph>
          </div>
        </div>
        <div className="buttons">
          {!isEditing && (
            <Popconfirm
              placement="bottom"
              title="Are you sure to delete this review?"
              onConfirm={() => handleDelete(review.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="danger" size="default">
                <Icon type="delete" /> Delete
              </Button>
            </Popconfirm>
          )}

          {isEditing ? (
            <Button
              style={{ backgroundColor: '#40A9FF', color: 'white' }}
              size="default"
              onClick={handleEdit}
              loading={loading}
              disabled={loading}
            >
              <span>
                <Icon type="save" /> Save
              </span>
            </Button>
          ) : (
            <Button
              style={{
                border: '1px solid #40A9FF',
                color: '#40A9FF',
              }}
              size="default"
              onClick={() => setEditing(!isEditing)}
            >
              <span>
                <Icon type="edit" /> Edit
              </span>
            </Button>
          )}

          {isEditing && (
            <Button
              size="default"
              type="danger"
              onClick={() => setEditing(false)}
            >
              <Icon type="close" /> Cancel
            </Button>
          )}
        </div>
      </StyledReview>
    </>
  );
};

const StyledReview = styled(Card)`
  max-width: 800px;
  padding: 50px !important;

  @media ${mobilePortrait} {
    padding: 0 !important;
  }

  @media ${tabletPortrait} {
    padding: 0 !important;
  }

  Paragraph {
    font-size: 20px;
  }
  .title-div {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 70%;
    margin: 0;
    margin-bottom: 20px;
    span {
      margin-bottom: 0;
    }
    @media ${mobilePortrait} {
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      margin: 0;
      width: 100%;
      span {
        margin: 0;
        font-size: 16px;
      }
      h2 {
        margin: 0;
        font-size: 18px;
        width: 100%;
      }
    }
    @media ${tabletPortrait} {
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;

      margin: 0;
      width: 100%;
      span {
        margin: 0;
        font-size: 18px;
      }
      h2 {
        /* margin: 20px; */
        font-size: 20px;
        width: 50%;
      }
    }
  }
  .company {
    font-size: 1.2rem;
    margin-left: 42px;
    margin-bottom: 20px;
    cursor: pointer;
    transition: 1s hover;
    &:hover {
      opacity: 0.6;
    }
    &:active {
      transform: scale(1.05);
    }
  }
  .ratings {
    display: flex;
    width: 50%;
    justify-content: space-between;
    margin-bottom: 20px;
    @media ${mobilePortrait} {
      justify-content: flex-start;
      margin: 0;
      margin-top: 20px;
      width: 100%;

      .stars {
        transform: scale(0.8);
        width: 60%;
      }
      h2 {
        margin: 0;
        font-size: 18px;
        width: 50%;
      }
    }
    @media ${tabletPortrait} {
      justify-content: flex-start;
      margin: 0;
      margin-top: 20px;
      width: 100%;

      h2 {
        margin: 0;
        font-size: 20px;
        width: 50%;
      }
    }
  }
  .switch-statements {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 20px;
    @media ${mobilePortrait} {
      flex-direction: column;
      margin-top: 20px;
    }
    @media ${tabletPortrait} {
      flex-direction: column;
      margin-top: 20px;
    }
    .current-employee {
      display: flex;
      width: 50%;
      justify-content: space-between;
      align-items: center;

      @media ${mobilePortrait} {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;

        h2 {
          margin: 0;
          font-size: 18px;
        }
      }

      @media ${tabletPortrait} {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 90%;

        h2 {
          margin: 0;
          font-size: 20px;
        }
      }
    }
  }
  .accepting-questions {
    display: flex;
    width: 50%;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    @media ${mobilePortrait} {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-left: 0;
      margin-top: 20px;
      width: 100%;

      h2 {
        margin: 0;
        font-size: 18px;
      }
    }
    @media ${tabletPortrait} {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20px;
      margin-left: 0;
      width: 90%;

      h2 {
        margin: 0;
        font-size: 20px;
      }
    }
  }

  .headline-div {
    margin-bottom: 20px;
    display: flex;
    align-items: center;

    @media ${mobilePortrait} {
      flex-direction: column;
      align-items: flex-start;
      h2 {
        margin: 0;
        font-size: 18px;
        width: 100%;
      }
      .headline {
        margin-left: 0;
        font-size: 16px;
      }
    }
    @media ${tabletPortrait} {
      flex-direction: column;
      align-items: flex-start;

      h2 {
        margin: 0;
        font-size: 20px;
        width: 100%;
      }
      .headline {
        margin-left: 0;
        font-size: 18px;
      }
    }
    h2 {
      margin: 0;
    }
  }

  h2 {
    margin: 0;
  }

  .headline {
    font-size: 1.1rem;
    margin: 0;
    margin-left: 42px;
    width: 50%;
  }
  .review-body {
    @media ${mobilePortrait} {
      h2 {
        font-size: 18px;
        margin-bottom: 0;
      }
    }
  }

  .buttons {
    margin-top: 50px;
    display: flex;
    justify-content: space-between;
    width: 30%;
    @media ${mobilePortrait} {
      width: 100%;
      display: flex;
      justify-content: space-evenly;
    }
    @media ${tabletPortrait} {
      width: 100%;
      display: flex;
      justify-content: space-evenly;
    }
  }

  .editable-text {
    .ant-typography-edit {
      display: none !important;
    }
  }
`;

export default withRouter(
  connect(state => state, { deleteCompanyReview, updateCompanyReview })(
    DetailedReviewCard
  )
);
