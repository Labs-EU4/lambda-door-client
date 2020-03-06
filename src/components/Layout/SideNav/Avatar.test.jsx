/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import * as rtl from '@testing-library/react';
import Avatar from './Avatar';
import '@testing-library/jest-dom/extend-expect';
import { renderWithRedux } from '../../../utils/testingHelpers';

beforeEach(rtl.cleanup);

describe('Avatar.jsx', () => {
  it('renders without crashing', () => {
    renderWithRedux(<Avatar />);
  });

  it('renders correctly', () => {
    expect(renderWithRedux(<Avatar />).baseElement).toMatchSnapshot();
  });
});
