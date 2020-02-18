import React from 'react';
import * as rtl from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import reducers from '../../../state/reducers/index';
import { renderWithRedux } from '../../../utils/testingHelpers';
import ConnectedHome, { Home } from '../Home';

const state = reducers(undefined, {});
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiaWF0IjoxNTc4NTY4NTgxfQ.6cR-MJGGZRHgszj1o1IgvyXfhEla3NYNegRT7aafXps';

describe('Home', () => {
  it('renders correctly', () => {
    expect(rtl.render(<Home />).baseElement).toMatchSnapshot();
  });

  it('shows the name of the site', () => {
    const siteTitle = rtl.render(<Home />).queryByText(/lambda door/i);
    expect(siteTitle).toBeInTheDocument();
  });

  it('shows the tagline of the site', () => {
    const siteTagline = rtl
      .render(<Home />)
      .queryByText(
        'The one-stop portal for Lambda graduates looking for company information in the quest for a job.'
      );
    expect(siteTagline).toBeInTheDocument();
  });

  it("Displays a snapshot for the home page with it's image information", () => {
    const { getAllByRole, asFragment } = rtl.render(<Home />);
    const ImageContent = getAllByRole('img');
    expect(rtl.render(<Home />).container).toMatchSnapshot();
    expect(ImageContent).toBeDefined();
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('ConnectedHome', () => {
  let useEffect;
  const mockUseEffect = () => {
    useEffect.mockImplementationOnce(f => f());
  };

  beforeEach(() => {});
  useEffect = jest.spyOn(React, 'useEffect');
  mockUseEffect();
  global.localStorage = jest.fn().mockImplementation(() => {
    return {
      getItem: jest.fn().mockReturnValue(token),
    };
  });

  it('renders correctly', () => {
    expect(renderWithRedux(<ConnectedHome />).baseElement).toMatchSnapshot();
  });
  it('has the correct state on load', () => {
    expect(state).toEqual({
      companies: {
        companies: [],
        isLoading: false,
      },
      allInterests: {
        interests: [],
        isLoading: false,
      },
      userInterests: {
        interests: [],
        isLoading: false,
      },
      jobroles: {
        isFetching: true,
        jobroles: [],
      },
      reviews: {
        isFetching: false,
        reviews: { company: [], salary: [], interview: [] },
      },
      reviewsError: null,
      authState: {
        isLoading: true,
        isLoggedIn: false,
        credentials: {},
        error: null,
      },
      search: {
        isSearching: false,
        searchResults: [],
      },
      singleCompanyReviews: {
        isFetching: false,
        reviews: {
          companyReview: [],
          interviewReview: [],
          salaryReview: [],
        },
      },
      singleReview: {
        isFetching: false,
        reviews: {
          companyReview: [],
          interviewReview: [],
        },
      },
      topRatedReviews: { isFetching: false, topRatedReviews: [] },
      avgSalaries: {
        avgSalaries: [],
        isFetching: false,
      },
      closestCompanies: { isFetching: false, closestCompanies: [] },
    });
  });
  // it('decodes the token of a previously authenticated user and passes them to the dashboard', async () => {
  //   if (token) {
  //     await store.dispatch(auth.SetAuthenticated(mockLoginData));
  //     expect(state.authState.isLoggedIn).toEqual(true);
  //   }
  // });
});
