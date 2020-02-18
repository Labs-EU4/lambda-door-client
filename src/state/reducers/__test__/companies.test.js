import '@testing-library/jest-dom/extend-expect';
import { companiesReducer } from '../companies';
import * as actions from '../../types';

const initialState = { isLoading: false, companies: [] };

const testCompanies = [
  {
    id: 5,
    name: 'DoNotPay Inc',
    description:
      'Fight corporations, beat bureaucracy and sue anyone at the press of a button.',
    website: 'https://donotpay.com',
    location: 'Portland, OR',
    type: 'Technology',
    logo: '',
    latitude: 31,
    longitude: -80,
    average_rating: '5.0000000000000000',
  },
  {
    id: 4,
    name: 'Bad Rabbit',
    description:
      'At Bad Rabbit, we make the systems you have work better for you.',
    website: 'https://www.badrabbit.com',
    location: 'Portland, OR',
    type: 'Technology',
    logo: '',
    latitude: 31,
    longitude: -80,
    average_rating: '5.0000000000000000',
  },
];

const newCompany = {
  id: 10,
  name: 'Paystack',
  description:
    'Paystack helps businesses in Africa get paid by anyone, anywhere in the world',
  website: 'https://paystack.com/',
  location: 'Lagos, NG',
  type: 'FinTech',
  logo: '',
  latitude: 31,
  longitude: -80,
  average_rating: '4.0000000000000000',
};

describe('companiesReducer', () => {
  it('should return the correct initial state', () => {
    expect(companiesReducer(undefined, {})).toEqual(initialState);
  });
  it('should handle GET_COMPANIES', () => {
    const startAction = {
      type: actions.GET_COMPANIES,
    };
    expect(companiesReducer(initialState, startAction)).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('should handle GET_COMPANIES_SUCCESS', () => {
    const startAction = {
      type: actions.GET_COMPANIES_SUCCESS,
      payload: testCompanies,
    };
    expect(companiesReducer(initialState, startAction)).toEqual({
      ...initialState,
      companies: testCompanies,
    });
  });

  it('should handle GET_COMPANIES_FAILURE', () => {
    const startAction = {
      type: actions.GET_COMPANIES_FAILURE,
    };
    expect(companiesReducer(initialState, startAction)).toEqual({
      ...initialState,
      isLoading: false,
    });
  });
});

it('should handle ADD_COMPANY_SUCCESS', () => {
  const startAction = {
    type: actions.ADD_COMPANY_SUCCESS,
    payload: newCompany,
  };
  expect(companiesReducer(initialState, startAction)).toEqual({
    ...initialState,
    isLoading: false,
    companies: [...initialState.companies, newCompany],
  });
});

it('should handle ADD_COMPANY_FAILURE', () => {
  const startAction = {
    type: actions.ADD_COMPANY_FAILURE,
  };
  expect(companiesReducer(initialState, startAction)).toEqual({
    ...initialState,
    isLoading: false,
  });
});
