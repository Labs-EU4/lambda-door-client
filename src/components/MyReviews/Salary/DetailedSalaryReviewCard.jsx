/* eslint-disable no-shadow */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';
import {
  Switch,
  Icon,
  Card,
  Button,
  Skeleton,
  Popconfirm,
  Typography,
  Select,
} from 'antd';
import styled from 'styled-components';
import { withRouter, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  deleteSalaryReview,
  updateSalaryReview,
} from '../../../state/actions/reviews';
import { mobilePortrait, tabletPortrait } from '../../../styles/theme.styles';
import { jobCategories } from '../../../utils/data';

const { Paragraph } = Typography;
let updatedReview;
export const DetailedSalaryReviewCard = ({
  history,
  reviews: {
    reviews: { salary },
  },
  deleteSalaryReview,
  updateSalaryReview,
}) => {
  const [isEditing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const reviewId = useParams().id;
  const review = salary.find(elem => elem.id === Number(reviewId));

  useEffect(() => {
    updatedReview = {
      ...review,
    };
    delete updatedReview.interest;
    delete updatedReview.full_name;
    delete updatedReview.name;
    delete updatedReview['i.id'];
  }, [review]);

  const handleDelete = async id => {
    await deleteSalaryReview(id, history);
  };

  const updateReview = (key, value) => {
    updatedReview[key] = value;
  };

  const handleSelect = value => {
    updateReview('interest_id', value);
  };

  const handleEdit = async () => {
    setLoading(true);
    await updateSalaryReview(updatedReview);
    setLoading(false);
    setEditing(false);
  };

  const updateAnonymous = value => {
    updatedReview.is_anonymous = value;
    updatedReview.is_accepting_questions = !value;
  };

  const { Option } = Select;
  const options = jobCategories.map(opt => (
    <Option key={opt.id} value={opt.id}>
      {opt.name}
    </Option>
  ));

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
          <h2>{review.name}</h2>
        </div>
        <div className="banner">
          <div className="salary-div">
            <h3>Salary /yr</h3>
            <Paragraph
              editable={{
                onChange: e => {
                  updateReview('salary', e);
                },
                editing: isEditing,
              }}
              className="editable-text salary"
            >
              {String(review.salary)}
            </Paragraph>
          </div>

          <div className="interest">
            <h3>Job Catergory</h3>
            {isEditing ? (
              <Select
                defaultValue={review.interest}
                onChange={e => {
                  handleSelect(e);
                }}
              >
                {options}
              </Select>
            ) : (
              review.interest
            )}
          </div>
        </div>

        <div>
          <div className="description">
            <h3>Job Description</h3>
            <Paragraph
              className="editable-text"
              editable={{
                onChange: e => {
                  updateReview('description', e);
                },
                editing: isEditing,
              }}
            >
              {review.description}
            </Paragraph>
          </div>
        </div>

        <div className="switch-statements">
          <div
            className="current-employee"
            data-testid={`employee - ${review.is_current_employee}`}
          >
            <h3>Current Employee</h3>
            <Switch
              checkedChildren={<Icon type="check" />}
              unCheckedChildren={<Icon type="close" />}
              defaultChecked={review.is_current_employee}
              disabled={!isEditing}
              onChange={e => {
                updateReview('is_current_employee', e === true ? 1 : 0);
              }}
            />
          </div>

          <div
            className="accepting-questions"
            data-testid={`questions - ${review.is_accepting_questions}`}
          >
            <h3>Anonymous</h3>
            <Switch
              checkedChildren={<Icon type="check" />}
              unCheckedChildren={<Icon type="close" />}
              defaultChecked={review.is_anonymous}
              disabled={!isEditing}
              onChange={e => {
                updateAnonymous(e);
              }}
            />
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
  .ant-select-selection {
    min-width: 150px;
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

  .banner {
    padding-bottom: 1.5rem;
  }

  .switch-statements {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 20px;
    padding-top: 1.5rem;
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
  connect(state => state, { deleteSalaryReview, updateSalaryReview })(
    DetailedSalaryReviewCard
  )
);
