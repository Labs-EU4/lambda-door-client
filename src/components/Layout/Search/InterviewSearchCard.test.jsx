import React from 'react';
import * as rtl from '@testing-library/react';
import InterviewSearchCard from './InterviewSearchCard';
import '@testing-library/jest-dom/extend-expect';
import { renderWithRedux } from '../../../utils/testingHelpers';

beforeEach(rtl.cleanup);

describe('InterviewSearchCard', () => {
  it('renders without crashing', () => {
    renderWithRedux(<InterviewSearchCard text={'test'} />);
  });

  it('renders correctly', () => {
    expect(
      renderWithRedux(<InterviewSearchCard text={'test'} />).baseElement
    ).toMatchSnapshot();
  });
});
