import React from 'react';
import * as rtl from '@testing-library/react';
import ChatButton from './ChatButton';
import '@testing-library/jest-dom/extend-expect';
import { renderWithRedux } from '../../../utils/testingHelpers';

beforeEach(rtl.cleanup);

describe('ChatButton', () => {
  it('renders without crashing', () => {
    renderWithRedux(<ChatButton />);
  });

  it('renders correctly', () => {
    expect(renderWithRedux(<ChatButton />).baseElement).toMatchSnapshot();
  });
});
