import React from 'react';
import * as rtl from '@testing-library/react';
import InterviewReviewList from './InterviewReviewList';
import '@testing-library/jest-dom/extend-expect';
import { renderWithRedux } from '../../../utils/testingHelpers';

beforeEach(rtl.cleanup);

describe('InterviewReviewList', () => {
  it('renders without crashing', () => {
    renderWithRedux(<InterviewReviewList />);
  });

  it('renders correctly', () => {
    expect(
      renderWithRedux(<InterviewReviewList />).baseElement
    ).toMatchSnapshot();
  });
});