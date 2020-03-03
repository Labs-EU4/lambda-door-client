import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Alert } from 'antd';
import styled from 'styled-components';
import { fx } from 'money';

import {
  Input,
  Rate,
  Switch,
  Form,
  Button,
  Icon,
  Select,
} from 'antd';
import AutoCompleteCompany from '../../utils/autocomplete';
import { mobilePortrait, tabletPortrait } from '../../styles/theme.styles';

import { getInterests } from '../../state/actions/interests';
import {
  addCompanyReview,
  addInterviewReview,
  addSalaryReview,
  getCurrencyRates,
} from '../../state/actions/reviews';

import currencies from '../../utils/currencies';

const { TextArea } = Input;
const { Option } = Select;

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
  addInterviewReview,
  addSalaryReview,
  getCurrencyRates,
  currencyRates: { currencyRates },
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

  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      history.push('/');
    }

    getInterests();
    getCurrencyRates();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    const {
      currency,
      unit,
      ratings,
      is_currently_employed,
      review_headline,
      review,
      text,
      is_accepting_questions,
      company_id,
      ...rest
    } = formValues;

    const salaryReview = {
      company_id,
      is_accepting_questions,
      ...rest,
    };
    const companyReview = {
      company_id,
      ratings,
      is_currently_employed,
      review_headline,
      review,
      is_accepting_questions,
    };

    const otherRates = {
      "NGN": 360,
    };

    fx.base = currencyRates.base;
    fx.rates = {
      ...currencyRates.rates,
      ...otherRates,
    };

    const convertedSalary = fx.convert(Number(currency), {
      from: unit.key,
      to: fx.base,
    });

    salaryReview['salary'] = Number(currency);
    salaryReview['currency'] = unit.label;
    salaryReview['base_salary'] = Math.round(convertedSalary);

    console.log(`currencyRates`, currencyRates);
    console.log(`base`, fx.base);
    console.log(`rates`, fx.rates);
    console.log(`salaryReview`, salaryReview);
    console.log(`companyReview`, companyReview);

    await addCompanyReview({ ...companyReview, user_id: id }, id, history);
    console.log(
      `companyId`,
      addCompanyReview({ ...companyReview, user_id: id }, id, history)
    );
    await addSalaryReview(salaryReview, id, history);
    await addInterviewReview(
      {
        ...formValues,
        is_current_employee: formValues.is_currently_employed,
      },
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
    event.persist();

    setFormValues({ ...formValues, [event.target.name]: event.target.value });

    let error = '';

    switch (event.target.name) {
      case 'review':
      case 'description':
      case 'text':
        error =
          event.target.value.length < 5 || event.target.value.length > 255
            ? 'Review must be 5 to 255 characters long!'
            : '';
        break;
      default:
        break;
    }

    setErrors({ ...errors, [event.target.name]: error });
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
            maxLength="255"
            minLength="5"
            required
          />
          {errors.review && (
            <Alert type="error" message={errors.review} showIcon />
          )}
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
            labelInValue
            onChange={e => handleComponentChange('interest_id', Number(e.key))}
            placeholder="Pick Category"
          >
            {allInterests.interests.map(obj => {
              return <Option key={obj.id}>{obj.interest}</Option>;
            })}
          </Select>
        </Form.Item>
        <Form.Item label="Job Description">
          <TextArea
            rows={5}
            name="description"
            placeholder="Please share with us what the job role involves"
            onChange={handleChange}
            maxLength="255"
            minLength="5"
            required
          />
          {errors.description && (
            <Alert type="error" message={errors.description} showIcon />
          )}
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
              <Select
                labelInValue
                defaultValue={{ key: 'USD' }}
                label="Currency"
                placeholder="Pick currency"
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
              >
                {currencies.map((elem, i) => {
                  return (
                    <Option key={i} value={elem.code}>
                      {elem.name}
                    </Option>
                  );
                })}
              </Select>
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
            onChange={handleChange}
            maxLength="255"
            minLength="5"
            required
          />
          {errors.text && <Alert type="error" message={errors.text} showIcon />}
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
            ) ||
            Number(formValues.company_id) !== formValues.company_id ||
            Object.values(errors).filter(elem => elem !== '').length // if there is more than 0 non empty properties on the errors object
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
    getCurrencyRates,
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
