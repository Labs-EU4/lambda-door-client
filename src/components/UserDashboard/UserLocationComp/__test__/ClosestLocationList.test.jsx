import React from 'react';
import * as rtl from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import { ClosestLocationList } from '../ClosestLocationList';

const getClosestCompanies = jest.fn();
const isFetching = false;
const closestCompanies = {
  closestCompanies: [
    {
      name: 'Accenture',
      website: 'www.accenture.com.',
      location: 'Atlanta, GA',
      longitude: -85.0,
      latitude: 33.7537,
      type: 'Business',
      logo: '',
      description: '',
    },
  ],
};
let wrapper;
beforeEach(() => {
  rtl.cleanup();
  wrapper = rtl.render(
    <Router>
      <ClosestLocationList
        getClosestCompanies={getClosestCompanies}
        isFetching={isFetching}
        closestCompanies={closestCompanies}
      />
    </Router>
  );
});

describe('ClosestLocationList', () => {
  wrapper = rtl.render(
    <Router>
      <ClosestLocationList
        getClosestCompanies={getClosestCompanies}
        isFetching={isFetching}
        closestCompanies={closestCompanies}
      />
    </Router>
  );
  it('renders correctly', () => {
    expect(wrapper.baseElement).toMatchSnapshot();
  });
});
