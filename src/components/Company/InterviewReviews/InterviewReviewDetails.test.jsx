import React from 'react';
import * as rtl from '@testing-library/react';
import InterviewReviewDetails from './InterviewReviewDetails';
import '@testing-library/jest-dom/extend-expect';
import { renderWithRedux } from '../../../utils/testingHelpers';

beforeEach(rtl.cleanup);

describe('InterviewReviewDetails', () => {
  it('renders without crashing', () => {
    renderWithRedux(<InterviewReviewDetails />);
  });

  it('renders correctly', () => {
    expect(
      renderWithRedux(<InterviewReviewDetails />).baseElement
    ).toMatchSnapshot();
  });
})