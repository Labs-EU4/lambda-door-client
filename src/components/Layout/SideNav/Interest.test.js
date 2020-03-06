/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import * as rtl from '@testing-library/react';
import Interests from './Interests';
import '@testing-library/jest-dom/extend-expect';
import { renderWithRedux } from '../../../utils/testingHelpers';

beforeEach(rtl.cleanup);

describe('Interests.jsx', () => {
  it('renders without crashing', () => {
    renderWithRedux(<Interests />);
  });

  it('renders correctly', () => {
    expect(renderWithRedux(<Interests />).baseElement).toMatchSnapshot();
  });
});
