/* eslint-disable no-shadow */
/* eslint-disable react/jsx-curly-newline */
import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, Input, Button, Icon, Switch } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { mobilePortrait } from '../../styles/theme.styles';
import AutoCompleteComponent from '../../utils/autocomplete';
import { addInterviewReview } from '../../state/actions/reviews';

const InterviewReviewForm = ({
  companies: { companies },
  authState: {
    credentials: { id },
  },
  addInterviewReview,
  history,
}) => {
  const [formValues, setFormValues] = useState({
    company_id: '',
    text: '',
    is_accepting_questions: false,
    is_current_employee: false,
  });
  const [loading, setLoading] = useState(false);
  const handleCompanyName = name => {
    const company = companies.find(element => {
      return element.name === name;
    });
    if (company) {
      setFormValues({
        ...formValues,
        company_id: company.id,
      });
    } else {
      setFormValues({
        ...formValues,
        company_id: name,
      });
    }
  };

  const handleComponentChange = (name, value) => {
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    await addInterviewReview(formValues, id, history);
    setLoading(false);
  };

  return (
    <StyledContainer>
      <Form layout="vertical">
        <div>
          <Form.Item
            validateStatus={
              Number(formValues.company_id) === formValues.company_id ||
              formValues.company_id === ''
                ? 'validating'
                : 'error'
            }
            hasFeedback={
              Number(formValues.company_id) !== formValues.company_id
            }
            help={
              Number(formValues.company_id) !== formValues.company_id &&
              formValues.company_id !== '' &&
              'You have not selected a company'
            }
          >
            <AutoCompleteComponent
              label="Company Name"
              placeholder="Company name"
              dataSource={companies}
              onChange={e => handleCompanyName(e)}
            />
          </Form.Item>
        </div>

        <Form.Item label="Review">
          <Input.TextArea
            rows={10}
            name="text"
            placeholder="Please share the steps involved in the interview process"
            onChange={e =>
              setFormValues({ ...formValues, text: e.target.value })
            }
          />
        </Form.Item>

        <Form.Item>
          <EmployeeInfo>
            <div>
              <p>I am a current employee</p>
              <Switch
                checkedChildren={<Icon type="check" />}
                unCheckedChildren={<Icon type="close" />}
                name="is_current_employee"
                onChange={value =>
                  handleComponentChange('is_current_employee', value)
                }
              />
            </div>
            <div>
              <p>I am accepting more questions</p>
              <Switch
                checkedChildren={<Icon type="check" />}
                unCheckedChildren={<Icon type="close" />}
                name="is_accepting_questions"
                onChange={value =>
                  handleComponentChange('is_accepting_questions', value)
                }
              />
            </div>
          </EmployeeInfo>
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          onClick={handleSubmit}
          disabled={
            Boolean(
              Object.keys(formValues).filter(elem => formValues[elem] === '')
                .length
            ) || Number(formValues.company_id) !== formValues.company_id
          }
        >
          Submit
        </Button>
      </Form>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  @media (min-width: 1024px) {
    width: 60%;
  }
`;

const EmployeeInfo = styled.div`
  display: flex;
  justify-content: space-between;
  div {
    width: 50%;
    p {
      display: inline;
      margin-right: 10%;
    }
  }
  @media ${mobilePortrait} {
    flex-direction: column;
    div {
      margin-bottom: 5%;
      width: 100%;
    }
  }
`;

export default withRouter(
  connect(state => state, { addInterviewReview })(InterviewReviewForm)
);
