// import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import * as rtl from '@testing-library/react';
import failureNotification from './failureNotification';

let tools;

beforeEach(() => {
  rtl.cleanup();
  tools = rtl.render(failureNotification());
});

describe('renders notification failure', () => {
  test('expect to render', () => {
    const selectText = tools.queryByText(/Something went wrong/i);
    expect(selectText).toBeInTheDocument();
  });
});
