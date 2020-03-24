import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  Alert,
  Input,
  Rate,
  Switch,
  Form,
  Button,
  Icon,
  Select,
  Checkbox,
} from 'antd';
import styled from 'styled-components';
import { fx } from 'money';

import AutoCompleteCompany from '../../utils/autocomplete';
import { mobilePortrait, tabletPortrait } from '../../styles/theme.styles';
import currencies from '../../utils/currencies';
import { employmentType } from '../../utils/employmentType';

import {
  addCompanyReview,
  addInterviewReview,
  addSalaryReview,
  getCurrencyRates,
} from '../../state/actions/reviews';

const { TextArea } = Input;
const { Option } = Select;

const AddReview = ({
  history,
  companies: { companies },
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
    employment_type: '',
    job_title: '',
    description: '',
    currency: '',
    unit: '',
    is_anonymous: false,
    is_current_employee: false,
    is_accepting_questions: false,

    ratings: 0,
    is_currently_employed: false,
    review: '',

    text: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [checkSalary, setCheckSalary] = useState(false);
  const [checkInterview, setCheckInterview] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      history.push('/');
    }

    getCurrencyRates();
  }, []);

  const onSalaryCheckChange = evt => {
    setCheckSalary(evt.target.checked);
  };

  const onInterviewCheckChange = evt => {
    setCheckInterview(evt.target.checked);
  };

  const convertCurrency = () => {
    const { unit, currency } = formValues;
    const otherRates = {
      NGN: 360,
    };

    fx.base = currencyRates.base;
    fx.rates = {
      ...currencyRates.rates,
      ...otherRates,
    };

    let convertedSalary;

    if (checkSalary) {
      return null;
    } else {
      convertedSalary = fx.convert(Number(unit), {
        from: currency.key,
        to: fx.base,
      });
    }
    return convertedSalary;
  };

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);

    const {
      currency,
      unit,
      employment_type,
      ratings,
      is_current_employee,
      is_currently_employed,
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
      review,
      is_accepting_questions,
    };

    salaryReview['employment_type'] = employment_type.key;
    salaryReview['salary'] = Number(unit);
    salaryReview['currency'] = currency.label;
    salaryReview['base_salary'] = Math.round(convertCurrency());
    salaryReview['is_current_employee'] = is_currently_employed;

    // if interview is hidden, call salary and company
    // else if salary is hidden call interview and company
    // else call of them...

    try {
      if (checkInterview && checkSalary) {
        addCompanyReview(
          { ...companyReview, user_id: id, review_headline: '' },
          id,
          history
        );
      } else if (checkInterview) {
        addSalaryReview(salaryReview, id, history);
        addCompanyReview(
          { ...companyReview, user_id: id, review_headline: '' },
          id,
          history
        );
      } else if (checkSalary) {
        addInterviewReview(
          {
            ...formValues,
            is_current_employee: formValues.is_currently_employed,
          },
          id,
          history
        );
        addCompanyReview(
          { ...companyReview, user_id: id, review_headline: '' },
          id,
          history
        );
      } else {
        addCompanyReview(
          { ...companyReview, user_id: id, review_headline: '' },
          id,
          history
        );
        addSalaryReview(salaryReview, id, history);
        addInterviewReview(
          {
            ...formValues,
            is_current_employee: formValues.is_currently_employed,
          },
          id,
          history
        );
      }
    } catch (error) {
      console.log(error);
    }

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

  const salaryLabel = `${`(This section is ${
    checkSalary ? 'not required,' : 'required,'
  }`}${` `}${`click on the checkbox to ${
    checkSalary ? 'enable' : 'disable'
  })`}`;

  const interviewLabel = `${`(This section is ${
    checkInterview ? 'not required,' : 'required,'
  }`}${` `}${`click on the checkbox to ${
    checkInterview ? 'enable' : 'disable'
  })`}`;

  const checkSalaryLabel = `${checkSalary ? 'Disabled' : 'Enabled'}`;
  const checkInterviewLabel = `${checkInterview ? 'Disabled' : 'Enabled'}`;

  return (
    <div>
      <h1>
        <b>Add your Review</b>
      </h1>
      <br />
      <Form layout="vertical">
        <div>
          <h3>
            <b>
              General Review{' '}
              <span className="req-style" style={{ color: '#ff4d4f' }}>
                (This section is required)
              </span>
            </b>
          </h3>
        </div>
        <Form.Item
          hasFeedback={Number(formValues.company_id) !== formValues.company_id}
          help={
            Number(formValues.company_id) !== formValues.company_id &&
            formValues.company_id !== '' &&
            'You have not selected a company'
          }
        >
          <AutoCompleteCompany
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

        <Form.Item label="Review">
          <TextArea
            rows={10}
            placeholder="Please share some of the pros and cons of working at this company"
            onChange={handleChange}
            maxLength="255"
            minLength="5"
            name="review"
            required
          />
          {errors.review && (
            <Alert type="error" message={errors.review} showIcon />
          )}
        </Form.Item>
        <ReviewHeader>
          <h3>
            <b>
              Salary Review{' '}
              <span
                className="req-style"
                style={{ color: checkSalary ? '#999999' : '#ff4d4f' }}
              >
                {' '}
                {salaryLabel}{' '}
              </span>
            </b>
          </h3>
          <p style={{ marginBottom: '20px' }}>
            <Checkbox checked={checkSalary} onChange={onSalaryCheckChange}>
              {checkSalaryLabel}
            </Checkbox>
          </p>
        </ReviewHeader>
        <Form.Item label="Job Title">
          <Input
            name="job_title"
            placeholder="Job Title"
            onChange={handleChange}
            disabled={checkSalary}
          />
        </Form.Item>
        <Form.Item label="Employment Type">
          <Select
            labelInValue
            name="employment_type"
            placeholder="Employment Type"
            onChange={e => handleComponentChange('employment_type', e)}
            disabled={checkSalary}
          >
            {employmentType.map(elem => {
              return (
                <Option key={elem.id} value={elem.id}>
                  {elem.name}
                </Option>
              );
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
            disabled={checkSalary}
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
                name="unit"
                onChange={handleChange}
                disabled={checkSalary}
              />
            </div>
            <div className="currency" style={{ width: '60%' }}>
              <Select
                labelInValue
                label="Currency"
                placeholder="Pick currency"
                onChange={e => handleComponentChange('currency', e)}
                filterOption={(inputValue, option) => {
                  if (
                    option.key.toLowerCase().includes(inputValue.toLowerCase())
                  ) {
                    return true;
                  }
                  return false;
                }}
                disabled={checkSalary}
              >
                {currencies.map((elem, i) => {
                  return (
                    <Option key={i} value={elem.code} label={elem.name}>
                      {elem.name}
                    </Option>
                  );
                })}
              </Select>
            </div>
          </div>
        </Form.Item>
        <ReviewHeader>
          <h3>
            <b>
              Interview Process Review{' '}
              <span
                className="req-style"
                style={{ color: checkInterview ? '#999999' : '#ff4d4f' }}
              >
                {' '}
                {interviewLabel}{' '}
              </span>
            </b>
          </h3>
          <p style={{ marginBottom: '20px' }}>
            <Checkbox
              checked={checkInterview}
              onChange={onInterviewCheckChange}
            >
              {checkInterviewLabel}
            </Checkbox>
          </p>
        </ReviewHeader>
        <Form.Item label="Review">
          <Input.TextArea
            rows={10}
            name="text"
            placeholder="Please share the steps involved in the interview process"
            onChange={handleChange}
            maxLength="255"
            minLength="5"
            required
            disabled={checkInterview}
          />
          {errors.text && <Alert type="error" message={errors.text} showIcon />}
        </Form.Item>
        {JSON.stringify(formValues)}
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          onClick={handleSubmit}
          disabled={
            (!checkInterview && errors.text !== '') ||
            (!checkSalary &&
              (formValues.job_title === '' ||
                formValues.employment_type === '' ||
                errors.description !== '' ||
                formValues.unit === '' ||
                formValues.currency === '')) ||
            Number(formValues.company_id) !== formValues.company_id ||
            formValues.ratings === '' ||
            errors.review !== ''
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

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;
