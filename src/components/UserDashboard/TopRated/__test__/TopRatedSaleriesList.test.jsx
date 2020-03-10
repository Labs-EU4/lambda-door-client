import React from 'react';
import * as rtl from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import { TopRatedSalary } from '../TopRatedSaleriesList';

const getHighestSalary = jest.fn();
const isFetching = false;
const authState = {
  credentials: { location: false },
};

const highestSalaries = {
  highestSalaries: [
    {
      job_title: 'Software Engineer',
      base_salary: 98000,
      salary: 98000,
      currency: 'US Dollar',
      companyName: 'Ahalogy',
    },
  ],
};
let wrapper;
beforeEach(() => {
  rtl.cleanup();
  wrapper = rtl.render(
    <Router>
      <TopRatedSalary
        getHighestSalary={getHighestSalary}
        isFetching={isFetching}
        highestSalaries={highestSalaries}
        authState={authState}
      />
    </Router>
  );
});
describe('TopRatedSalaries', () => {
  wrapper = rtl.render(
    <Router>
      <TopRatedSalary
        getHighestSalary={getHighestSalary}
        isFetching={isFetching}
        highestSalaries={highestSalaries}
        authState={authState}
      />
    </Router>
  );
  it('renders correctly', () => {
    expect(wrapper.baseElement).toMatchSnapshot();
  });
});
