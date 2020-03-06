import React from 'react';
import * as rtl from '@testing-library/react';
import CompanyReviewList from '../CompanyReviewList';
import '@testing-library/jest-dom/extend-expect';
import { renderWithRedux } from '../../../../utils/testingHelpers';

beforeEach(rtl.cleanup);

describe('CompanyReviewList', () => {
  it('renders without crashing', () => {
    renderWithRedux(<CompanyReviewList />);
  });

  it('renders correctly', () => {
    expect(
      renderWithRedux(<CompanyReviewList />).baseElement
    ).toMatchSnapshot();
  });
});