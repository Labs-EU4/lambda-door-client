import '@testing-library/jest-dom/extend-expect';
import * as rtl from '@testing-library/react';
import withAuth from './axios';

beforeEach(() => {
  rtl.cleanup();
});

describe('maounts axios', () => {
  test('mount success', () => {
    expect(withAuth()).toBeTruthy();
  });
});
