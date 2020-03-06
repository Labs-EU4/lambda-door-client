import React from 'react';
import * as rtl from '@testing-library/react';
import CompanySearchCard from './CompanySearchCard';
import '@testing-library/jest-dom/extend-expect';
import { renderWithRedux } from '../../../utils/testingHelpers';

beforeEach(rtl.cleanup);

describe('CompanySearchCard', () => {
  it('renders without crashing', () => {
    renderWithRedux(<CompanySearchCard />);
  });

  it('renders correctly', () => {
    expect(
      renderWithRedux(<CompanySearchCard />).baseElement
    ).toMatchSnapshot();
  });
});
