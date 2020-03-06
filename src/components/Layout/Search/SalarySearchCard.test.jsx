import React from 'react';
import * as rtl from '@testing-library/react';
import SalarySearchCard from './SalarySearchCard';
import '@testing-library/jest-dom/extend-expect';
import { renderWithRedux } from '../../../utils/testingHelpers';

beforeEach(rtl.cleanup);

describe('SalarySearchCard', () => {
  it('renders without crashing', () => {
    renderWithRedux(<SalarySearchCard currency={'US Dollar'} />);
  });

  it('renders correctly', () => {
    expect(
      renderWithRedux(<SalarySearchCard currency={'US Dollar'} />).baseElement
    ).toMatchSnapshot();
  });
});
