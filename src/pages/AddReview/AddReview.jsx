import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import styled from 'styled-components';
import Select from '../../utils/select';
import AutoCompleteComponent from '../../utils/autocomplete';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Input, Rate, Switch, Form, Button, Icon, AutoComplete } from 'antd';
import AutoCompleteCompany from '../../utils/autocomplete';

import { mobilePortrait, tabletPortrait } from '../../styles/theme.styles';

import { getInterests } from '../../state/actions/interests';
import {
  addCompanyReview,
  addSalaryReview,
  addInterviewReview,
} from '../../state/actions/reviews';
import currencies from '../../utils/currencies';

const { TabPane } = Tabs;
const { TextArea } = Input;
const { Option } = AutoComplete;

const AddReview = ({
  history,
  location,
  companies: { companies },
  allInterests,
  getInterests,
  authState: {
    credentials: { id },
  },
  addCompanyReview,
  addSalaryReview,
  addInterviewReview,
}) => {
  const [formValues, setFormValues] = useState({
    company_id: '',
    interest_id: '',
    job_title: '',
    description: '',
    currency: '',
    unit: '',
    is_anonymous: false,
    is_current_employee: false,
    is_accepting_questions: false,

    ratings: 0,
    is_currently_employed: false,
    review_headline: '',
    review: '',

    text: '',
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    // formValues.is_current_employee = formValues.is_currently_employed;

    // setFormValues({
    //   ...formValues,
    //   is_current_employee: formValues.is_currently_employed,
    // });

    const { currency, unit, ...rest } = formValues;
    const review = { ...rest };

    review.salary = Number(currency);
    review.currency = unit;

    await addCompanyReview({ ...formValues, user_id: id }, id, history);
    await addSalaryReview(
      { ...review, is_current_employee: formValues.is_currently_employed },
      id,
      history
    );
    await addInterviewReview(
      { ...formValues, is_current_employee: formValues.is_currently_employed },
      id,
      history
    );
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

  const handleChange = event => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  const handleComponentChange = (name, value) => {
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleAnonymous = value => {
    setFormValues({
      ...formValues,
      is_anonymous: value,
    });
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      history.push('/');
    }
    async function allInterests() {
      await getInterests();
    }

    allInterests();
  }, []);

  return (
    <div>
      <h1>
        <b>Add your Review</b>
      </h1>
      <br />
      <Form layout="vertical">
        <h3>
          <b>General Review</b>
        </h3>
        <Form.Item
          // validateStatus={
          //   Number(formValues.company_id) === formValues.company_id ||
          //   formValues.company_id === ''
          //     ? 'validating'
          //     : 'error'
          // }
          hasFeedback={Number(formValues.company_id) !== formValues.company_id}
          help={
            Number(formValues.company_id) !== formValues.company_id &&
            formValues.company_id !== '' &&
            'You have not selected a company'
          }
        >
          <AutoCompleteCompany
            label="Company Name"
            placeholder="Company name"
            onChange={e => {
              handleCompanyName(e);
            }}
            dataSource={companies}
          />
        </Form.Item>
        <Form.Item label="Overall Rating">
          <Rate
            defaultValue={0}
            name="ratings"
            onChange={value => handleComponentChange('ratings', value)}
          />
        </Form.Item>
        <Form.Item>
          <SwitchContainer>
            <div>
              <p>I am a current employee</p>
              <Switch
                checkedChildren={<Icon type="check" />}
                unCheckedChildren={<Icon type="close" />}
                name="is_currently_employed"
                onChange={value =>
                  handleComponentChange('is_currently_employed', value)
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
        <Form.Item label="Review Headline">
          <Input
            name="review_headline"
            placeholder="Review Headline"
            onChange={handleChange}
            maxLength={100}
          />
        </Form.Item>
        <Form.Item label="Review">
          <TextArea
            rows={10}
            placeholder="Please share some of the pros and cons of working at this company"
            name="review"
            onChange={handleChange}
          />
        </Form.Item>
        <h3>
          <b>Salary Review</b>
        </h3>
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
          <div
            style={{
              display: 'flex',
              width: '80%',
              justifyContent: 'space-between',
            }}
          >
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
          </div>
        </Form.Item>
        <h3>
          <b>Interview Process Review</b>
        </h3>
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
    </div>
  );
};

export default withRouter(
  connect(state => state, {
    getInterests,
    addCompanyReview,
    addSalaryReview,
    addInterviewReview,
  })(AddReview)
);

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
