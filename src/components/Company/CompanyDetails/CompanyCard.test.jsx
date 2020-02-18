import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { render, cleanup } from '@testing-library/react';
import CompanyCard from './CompanyCard';

jest.mock('./CompanySalaryChart', () => () => (
  <div id="mockSalaryChart">mockSalaryChart</div>
));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const testArray = [
  {
    id: 6,
    name: 'Newfront Insurance',
    description: '',
    website: 'https://www.newfrontinsurance.com',
    location: 'San Francisco, CA',
    type: 'insurance',
    logo: '',
    latitude: 31,
    longitude: -80,
    average_rating: null,
  },
  {
    id: 12,
    name: 'Chipper Cash',
    description: '',
    website: 'https://chippercash.com/',
    location: 'Lagos, NG',
    type: 'FinTech',
    logo: '',
    latitude: 31,
    longitude: -80,
    average_rating: null,
  },
];

const testSalaries = {
  avgSalaries: [
    {
      interest_id: 2,
      interest: 'Front End',
      currency: 'USD',
      avg: 95000,
    },
    {
      interest_id: 4,
      interest: 'Full Stack',
      currency: 'USD',
      avg: 67500,
    },
  ],
};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: '6',
  }),
}));

afterEach(cleanup);

describe('Tests for CompanyCard ', () => {
  test('renders component', () => {
    // const store = mockStore({});
    const { getByText } = render(
      // <Provider store={store}>

      <CompanyCard companies={testArray} avgSalaries={testSalaries} />
      // </Provider>
    );

    expect(getByText('Newfront Insurance')).toBeTruthy();
    expect(getByText('Company Type: insurance')).toBeTruthy();
    expect(getByText('San Francisco, CA')).toBeTruthy();
  });
});
