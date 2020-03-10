import React from 'react';
import * as rtl from '@testing-library/react';
import SideNav from './SideNav';
import '@testing-library/jest-dom/extend-expect';
import { renderWithRedux } from '../../../utils/testingHelpers';

beforeEach(rtl.cleanup);

describe('SideNav', () => {
  it('renders without crashing', () => {
    renderWithRedux(<SideNav />);
  });

  it('renders correctly', () => {
    expect(renderWithRedux(<SideNav />).baseElement).toMatchSnapshot();
  });
});
