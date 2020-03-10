import React from 'react';
import * as rtl from '@testing-library/react';
import HighestSalaryCard from './HighestSalaryCard';
import '@testing-library/jest-dom/extend-expect';
import { renderWithRedux } from '../utils/testingHelpers';

beforeEach(rtl.cleanup);

describe('highestSalaryCard', () => {
  it('renders without crashing', () => {
    renderWithRedux(<HighestSalaryCard />);
  });

  it('renders correctly', () => {
    expect(
      renderWithRedux(<HighestSalaryCard />).baseElement
    ).toMatchSnapshot();
  });
});