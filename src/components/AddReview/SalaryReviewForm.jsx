/* eslint-disable react/jsx-curly-newline */
/* eslint-disable no-shadow */
import React, { useState } from 'react';
import { Input, Switch, Form, Button, Icon, AutoComplete } from 'antd';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { mobilePortrait, tabletPortrait } from '../../styles/theme.styles';
import currencies from '../../utils/currencies';
import Select from '../../utils/select';
import AutoCompleteComponent from '../../utils/autocomplete';
import { addSalaryReview } from '../../state/actions/reviews';

const { TextArea } = Input;
const { Option } = AutoComplete;

const SalaryReview = ({
  addSalaryReview,
  companies: { companies },
  authState: {
    credentials: { id },
  },
  allInterests,
  history,
}) => {
  const [formValues, setFormValues] = useState({
    company_id: '',
    interest_id: '',
    job_title: '',
    description: '',
    currency: '',
    unit: '',
    is_current_employee: false,
    is_anonymous: false,
    is_accepting_questions: false,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const { currency, unit, ...rest } = formValues;
    const review = { ...rest };

    review.salary = Number(currency);
    review.currency = unit;

    await addSalaryReview(review, id, history);
    setLoading(false);
  };

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

  const handleChange = event => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  const handleAnonymous = value => {
    setFormValues({
      ...formValues,
      is_anonymous: value,
      is_accepting_questions: !value,
    });
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
        <Form.Item label="Job Title">
          <Input
            name="job_title"
            placeholder="Job Title"
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Job Category">
          <Select
            placeholder="Category"
            arr={allInterests.interests.map(obj => {
              return {
                id: obj.id,
                name: obj.interest,
              };
            })}
            onChange={handleComponentChange}
          />
        </Form.Item>
        <Form.Item label="Job Description">
          <TextArea
            rows={5}
            name="description"
            placeholder="Please share with us what the job role involves"
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item label="Salary">
          <EmployeeInfo>
            <div>
              <Input
                type="number"
                step="0.01"
                placeholder="Annual Salary"
                name="currency"
                onChange={handleChange}
              />
            </div>
            <div className="currency" style={{ width: '60%' }}>
              <AutoComplete
                label="Currency"
                placeholder="Currency"
                optionLabelProp="value"
                onChange={e => handleComponentChange('unit', e)}
                filterOption={(inputValue, option) => {
                  if (
                    option.key.toLowerCase().includes(inputValue.toLowerCase())
                  ) {
                    return true;
                  }
                  return false;
                }}
                dataSource={currencies.map(elem => (
                  <Option key={elem.name} text={elem.name} value={elem.name}>
                    <p>{elem.name}</p>
                  </Option>
                ))}
              >
                <Input size="default" />
              </AutoComplete>
            </div>
          </EmployeeInfo>
        </Form.Item>

        <Form.Item>
          <SwitchContainer>
            <div>
              <p>I am a current employee</p>
              <Switch
                checkedChildren={<Icon type="check" />}
                unCheckedChildren={<Icon type="close" />}
                onChange={value =>
                  handleComponentChange('is_current_employee', value)
                }
              />
            </div>
            <div>
              <p>I want to be anonymous</p>
              <Switch
                checkedChildren={<Icon type="check" />}
                unCheckedChildren={<Icon type="close" />}
                defaultChecked={false}
                onChange={value => handleAnonymous(value)}
              />
            </div>
          </SwitchContainer>
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          onClick={handleSubmit}
          loading={loading}
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

export default withRouter(
  connect(state => state, { addSalaryReview })(SalaryReview)
);

const StyledContainer = styled.div`
  width: 100%;
  margin: 5% 0%;
  .ant-btn:hover,
  .ant-btn:focus,
  .ant-btn:active,
  .ant-btn.active {
    background: #bb1333;
    color: #fff;
  }
  @media (min-width: 1024px) {
    width: 60%;
  }
`;

const SwitchContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;

  div {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    p {
      margin-right: 10px;
      margin-bottom: 0;
    }
  }

  div.ant-row.ant-form-item {
    margin-top: -30px !important;
  }
  div {
    /* width: 50%; */
    .ant-select-selection--single {
      width: 95%;
    }
    .ant-select-selection__rendered {
      width: 100%;
    }
    p {
      display: inline;
    }
  }
  @media ${mobilePortrait} {
    flex-direction: column;
    width: 100%;

    div {
      width: 100%;
      margin-bottom: 5%;
      /* justify-content: center; */
      p {
        justify-content: flex-start;
        margin-bottom: 0;
      }
      .ant-select-selection--single {
        width: 100%;
        margin-left: 0%;
      }
    }
  }
  @media ${tabletPortrait} {
    flex-direction: column;
    width: 100%;

    div {
      width: 100%;
      margin-bottom: 5%;
      /* justify-content: center; */
      p {
        justify-content: flex-start;
        margin-bottom: 0;
      }
      .ant-select-selection--single {
        width: 100%;
        margin-left: 0%;
      }
    }
  }
`;

const EmployeeInfo = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-between;

  div.ant-row.ant-form-item {
    margin-top: -30px !important;
  }
  div {
    /* width: 50%; */
    .ant-select-selection--single {
      width: 95%;
    }
    .ant-select-selection__rendered {
      width: 100%;
    }
    p {
      display: inline;
    }
  }
  @media ${mobilePortrait} {
    flex-direction: column;
    div {
      width: 100%;
      margin-bottom: 5%;
      justify-content: center;
      .ant-select-selection--single {
        width: 100%;
        margin-left: 0%;
      }
    }
  }
`;
