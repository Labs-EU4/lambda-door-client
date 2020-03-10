import React from 'react';
import * as rtl from '@testing-library/react';
import SearchResults from './SearchResults';
import '@testing-library/jest-dom/extend-expect';
import { renderWithRedux } from '../../../utils/testingHelpers';

beforeEach(rtl.cleanup);

describe('SearchResults', () => {
  it('renders without crashing', () => {
    renderWithRedux(<SearchResults />);
  });

  it('renders correctly', () => {
    expect(renderWithRedux(<SearchResults />).baseElement).toMatchSnapshot();
  });
});
