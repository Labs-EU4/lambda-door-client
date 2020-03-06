import React from 'react';
import * as rtl from '@testing-library/react';
import AppInfoContainer from './AppInfoContainer';
import '@testing-library/jest-dom/extend-expect';
import { renderWithRedux } from '../utils/testingHelpers';

beforeEach(rtl.cleanup);

describe('AppInfoContainer', () => {
  it('renders without crashing', () => {
    renderWithRedux(<AppInfoContainer />);
  });

  it('renders correctly', () => {
    expect(renderWithRedux(<AppInfoContainer />).baseElement).toMatchSnapshot();
  });
});
