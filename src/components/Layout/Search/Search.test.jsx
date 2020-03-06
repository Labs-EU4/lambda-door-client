import React from 'react';
import * as rtl from '@testing-library/react';
import Search from './Search';
import '@testing-library/jest-dom/extend-expect';
import { renderWithRedux } from '../../../utils/testingHelpers';

beforeEach(rtl.cleanup);

describe('Search', () => {
  it('renders without crashing', () => {
    renderWithRedux(<Search />);
  });

  it('renders correctly', () => {
    expect(renderWithRedux(<Search />).baseElement).toMatchSnapshot();
  });
});
