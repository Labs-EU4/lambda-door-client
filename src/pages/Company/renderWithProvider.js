import React from 'react';
import * as rtl from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../state/store.js';

const renderWithProviders = ui => {
  return {
    ...rtl.render(<Provider store={store}>{ui}</Provider>),
  };
};

export default renderWithProviders;
