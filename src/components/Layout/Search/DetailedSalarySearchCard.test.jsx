import React from 'react';
import * as rtl from '@testing-library/react';
import DetailedSalarySearchCard from './DetailedSalarySearchCard';
import '@testing-library/jest-dom/extend-expect';
import { renderWithRedux } from '../../../utils/testingHelpers';

beforeEach(rtl.cleanup);

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: 0,
  }),
}));

describe('DetailedSalarySearchCard', () => {
  it('renders without crashing', () => {
    renderWithRedux(<DetailedSalarySearchCard />, {
      initialState: {
        search: {
          searchResults: [[{ id: 0, name: 'test', currency: 'US Dollar' }]],
        },
      },
    });
  });

  it('renders correctly', () => {
    expect(
      renderWithRedux(<DetailedSalarySearchCard />, {
        initialState: {
          search: {
            searchResults: [[{ id: 0, name: 'test', currency: 'US Dollar' }]],
          },
        },
      }).baseElement
    ).toMatchSnapshot();
  });
});
