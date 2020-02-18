import React from 'react';
import * as rtl from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Footer from './FooterNav';

describe('Footer Test', () => {
  it('renders correctly', () => {
    expect(rtl.render(<Footer />).baseElement).toMatchSnapshot();
  });

  it('shows the copy right tag', () => {
    const copyRight = rtl.render(<Footer />).queryByText(/2020 LambdaDoor/i);
    expect(copyRight).toBeInTheDocument();
  });
});
