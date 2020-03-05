import '@testing-library/jest-dom/extend-expect';
import * as rtl from '@testing-library/react';
import imageUpload from './ImageUpload';
import image from '../../public/logo-512.png';

beforeEach(() => {
  rtl.cleanup();
});

describe('uploads image', () => {
  test('upload success', () => {
    expect(imageUpload(image)).toBeTruthy();
  });
});
