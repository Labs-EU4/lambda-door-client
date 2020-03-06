import React from 'react';
import * as rtl from '@testing-library/react';
import DetailedInterviewSearchCard from './DetailedInterviewSearchCard';
import '@testing-library/jest-dom/extend-expect';
import { renderWithRedux } from '../../../utils/testingHelpers';

beforeEach(rtl.cleanup);

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: 0,
  }),
}));

describe('DetailedInterviewSearchCard', () => {
  it('renders without crashing', () => {
    renderWithRedux(<DetailedInterviewSearchCard />, {
      initialState: { search: { searchResults: [[{ id: 0, name: 'test' }]] } },
    });
  });

  it('renders correctly', () => {
    expect(
      renderWithRedux(<DetailedInterviewSearchCard />, {
        initialState: {
          search: { searchResults: [[{ id: 0, name: 'test' }]] },
        },
      }).baseElement
    ).toMatchSnapshot();
  });
});
