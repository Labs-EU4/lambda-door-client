import React from 'react';
import * as rtl from '@testing-library/react';
import AddReview from './AddReview';
import '@testing-library/jest-dom/extend-expect';
import { renderWithRedux } from '../../utils/testingHelpers';

beforeEach(rtl.cleanup);

describe('AddReview', () => {
  it('renders without crashing', () => {
    renderWithRedux(<AddReview />);
  });
  it('renders correctly', () => {
    expect(renderWithRedux(<AddReview />).baseElement).toMatchSnapshot();
  });
  it('renders correctly', () => {
    // expect().queryByText(
    //   /Pick currency/i
    // );
    // expect().quer;
    // const { render } = renderWithRedux(<AddReview />).baseElement;
    // console.log(render);
    // console.log(renderWithRedux(<AddReview />).baseElement);
  });
});
