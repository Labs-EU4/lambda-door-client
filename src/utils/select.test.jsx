import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import * as rtl from '@testing-library/react';
import SelectOptions from './select';

let tools;

const test = [1, 2, 3, 4, 5, 6];

beforeEach(() => {
  rtl.cleanup();
  tools = rtl.render(
    <SelectOptions
      onChange={Function.prototype}
      placeholder="name"
      arr={test}
    />
  );
});

describe('Checks if Select mounts', () => {
  it('renders component', () => {
    const selectText = tools.queryByText(/name/i);
    expect(selectText).toBeInTheDocument();
  });
  it('exists', () => {
    const selectText = tools.queryByText(/name/i);
    expect(selectText).toBeTruthy();
  });
});
