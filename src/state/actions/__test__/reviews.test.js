import React from 'react';
import * as rtl from '@testing-library/react';
import configureStore from 'redux-mock-store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import * as types from '../../types/index';
import {
  addCompanyReview,
  getCompanyReviews,
  getReviewsByCompanyId,
  getReviewsByReviewId,
  updateCompanyReview,
  deleteCompanyReview,
  getSalaryReviews,
  getInterviewReviews,
} from '../reviews';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const mock = new MockAdapter(axios);

const userCompanyReview = [
  {
    review: "most rewarding job ever.",
  }
];

const companyReviews = [
  {
    id: 3,
    ratings: 5,
    review_headline: "Flexible Working Hours and Great Benefits.",
    review: "They care about you",
    name: "Accenture",
    company_id: 1,
    is_accepting_questions: true,
    full_name: "Victor Arowo",
    user_id: 3,
    email_address: "arowove@g.com"
  },
  {
    id: 4,
    ratings: 4,
    review_headline: "Very good",
    review: "I work in Accenture",
    name: "Accenture",
    company_id: 1,
    is_accepting_questions: false,
    full_name: "Emily Abrahart",
    user_id: 4,
    email_address: "emilyabraharty@gmail.com"
  },
]

const singleCompanyReview = {
  id: 3,
  ratings: 5,
  review_headline: "Flexible Working Hours and Great Benefits.",
  review: "They care about you",
  name: "Accenture",
  company_id: 1,
  is_accepting_questions: true,
  full_name: "Victor Arowo",
  user_id: 3,
  email_address: "arowove@g.com"
}

const updated = {
  id: 3,
  ratings: 5,
  review_headline: "Updated Review!",
  review: "This review has been updated!",
  name: "Accenture",
  company_id: 1,
  is_accepting_questions: true,
  full_name: "Victor Arowo",
  user_id: 3,
  email_address: "arowove@g.com"
}

const salaryReview = {
  message:
    'The average pay of a new junior fullStack developer is $70,000/year',
};

const interviewReview = {
  message:
    'For me, I had an online test, then a phone interview followed by a person interview at their office',
};

afterEach(rtl.cleanup);
let wrapper;
beforeEach(() => {
  wrapper = rtl.render;
});

describe('Action/types company review testing', () => {

  describe('Get company review with user Id', () => {
    it('should execute get review data with user Id', async () => {
      const store = mockStore({});
      const actions = store.getActions();
  
      await store.dispatch(getCompanyReviews());
      expect(actions[0]).toEqual({ type: types.GET_COMPANY_REVIEWS });
    });
  
    it('should execute fetch company review success with user Id', async () => {
      await mock
        .onGet(`${process.env.REACT_APP_BACKEND_URL}/companyreviews/user/1`)
        .reply(200, userCompanyReview);
      const expectedAction = {
        type: types.GET_COMPANY_REVIEWS_SUCCESS,
        payload: userCompanyReview,
      };
      const store = mockStore({});
      const actions = store.getActions();
      await store.dispatch(getCompanyReviews(1));
      expect(actions[1]).toEqual(expectedAction);
    });
  
    it('should return Error on fetch company review data with user Id', async () => {
      const code = 401;
      await mock
        .onGet(`${process.env.REACT_APP_BACKEND_URL}/companyreviews/user/1`)
        .reply(code);
      const expectedAction = {
        type: types.GET_COMPANY_REVIEWS_FAILURE,
        payload: `Request failed with status code ${code}`,
      };
      const store = mockStore({});
      const actions = store.getActions();
      await store.dispatch(getCompanyReviews(1));
      expect(actions[1]).toEqual(expectedAction);
    });
  })

  describe('Get company review data with company Id', () => {
    test('should execute get company reviews data with company Id', async () => {
      const store = mockStore({});
      const actions = store.getActions();
  
      await store.dispatch(getReviewsByCompanyId(1));
      expect(actions[0]).toEqual({
        type: types.GET_SINGLE_COMPANY_REVIEWS,
      })
    })
  
    test('should execute get company reviews data success with company Id', async () => {
  
      await mock
        .onGet(`${process.env.REACT_APP_BACKEND_URL}/companyreviews/reviews/1`)
        .reply(200, companyReviews)
      const store = mockStore({});
      const actions = store.getActions();
  
      await store.dispatch(getReviewsByCompanyId(1));
      expect(actions[1]).toEqual({
        type: types.GET_SINGLE_COMPANY_REVIEWS_SUCCESS,
        payload: companyReviews,
      })
    })
  
    test('should execute get company reviews error with company Id', async () => {
      const code = 404;
      await mock.onGet(`${process.env.REACT_APP_BACKEND_URL}/companyreviews/reviews/1`).reply(code);
  
      const expectedAction = {
        type: types.GET_SINGLE_COMPANY_REVIEWS_FAILURE,
        payload: `Request failed with status code ${code}`,
      }
  
      const store = mockStore({});
      const actions = store.getActions();
      await store.dispatch(getReviewsByCompanyId());
      expect(actions[1]).toEqual(expectedAction);
    });
  })

  describe('Get company review data with review Id', () => {
    test('should execute get company reviews data with review Id', async () => {
      const store = mockStore({});
      const actions = store.getActions();
  
      await store.dispatch(getReviewsByReviewId(1));
      expect(actions[0]).toEqual({
        type: types.GET_SINGLE_REVIEWS,
      })
    })
  
    test('should execute get company reviews data success with review Id', async () => {
      mock
        .onGet(`${process.env.REACT_APP_BACKEND_URL}/companyreviews/1`)
        .reply(200, singleCompanyReview)
      const store = mockStore({});
      const actions = store.getActions();
  
      await store.dispatch(getReviewsByReviewId(1));
      expect(actions[1]).toEqual({
        type: types.GET_SINGLE_REVIEWS_SUCCESS,
        payload: singleCompanyReview,
      })
    })
  
    test('should execute get company reviews error with review Id', async () => {
      const code = 404;
      mock.onGet(`${process.env.REACT_APP_BACKEND_URL}/companyreviews/1`).reply(code);
  
      const expectedAction = {
        type: types.GET_SINGLE_REVIEWS_FAILURE,
        payload: `Request failed with status code ${code}`,
      }
  
      const store = mockStore({});
      const actions = store.getActions();
      await store.dispatch(getReviewsByReviewId());
      expect(actions[1]).toEqual(expectedAction);
    }) 
  })

  describe('Add company review with company Id', () => {
    test('should execute add company reviews data with company Id', async () => {
      const store = mockStore({});
      const actions = store.getActions();

      await store.dispatch(addCompanyReview(singleCompanyReview));
      expect(actions[0]).toEqual({
        type: types.ADD_COMPANY_REVIEW,
      })
    })

    test('should execute add company reviews success data with company Id', async () => {
      mock
        .onPost(`${process.env.REACT_APP_BACKEND_URL}/companyreviews/1`, singleCompanyReview)
        .reply(201, singleCompanyReview)
      const store = mockStore({});
      const actions = store.getActions();

      await store.dispatch(addCompanyReview(singleCompanyReview, 1));
      expect(actions[1]).toEqual({
        type: types.ADD_COMPANY_REVIEW_SUCCESS,
        payload: singleCompanyReview,
      })
    })

    test('should execute add company reviews error with company Id', async () => {
      const code = 404;
      mock.onPost(`${process.env.REACT_APP_BACKEND_URL}/companyreviews/1`, singleCompanyReview).reply(code);

      const expectedAction = {
        type: types.ADD_COMPANY_REVIEW_FAILURE,
        payload: `Request failed with status code ${code}`,
      }

      const store = mockStore({});
      const actions = store.getActions();
      await store.dispatch(addCompanyReview(singleCompanyReview, 1));
      expect(actions[1]).toEqual(expectedAction);
    })
  })

  describe('Update company review', () => {
    test('should execute update company review', async () => {
      const store = mockStore({});
      const actions = store.getActions();

      await store.dispatch(updateCompanyReview(updated));
      expect(actions[0]).toEqual({
        type: types.UPDATE_COMPANY_REVIEWS,
      })
    })

    test('should execute update company review success', async () => {
      mock
        .onPatch(`${process.env.REACT_APP_BACKEND_URL}/companyreviews/${updated.id}`, updated)
        .reply(201, updated)
      const store = mockStore({});
      const actions = store.getActions();

      await store.dispatch(updateCompanyReview(updated, 1));
      expect(actions[1]).toEqual({
        type: types.UPDATE_COMPANY_REVIEWS_SUCCESS,
        payload: updated,
      })
    })

    test('should execute update company review Error', async () => {
      const code = 404;
      mock
        .onPatch(`${process.env.REACT_APP_BACKEND_URL}/companyreviews/${updated.id}`, updated)
        .reply(code)
      const store = mockStore({});
      const actions = store.getActions();

      const expectedAction = {
        type: types.UPDATE_COMPANY_REVIEWS_FAILURE,
        payload: `Request failed with status code ${code}`,
      }

      await store.dispatch(updateCompanyReview(updated, 1));
      expect(actions[1]).toEqual(expectedAction)
    })
  })
  
  
  describe('Delete company review with company Id', () => {
    test('should execute delete company with company Id', async () => {
      const store = mockStore({});
      const actions = store.getActions();
  
      await store.dispatch(deleteCompanyReview(1));
      expect(actions[0]).toEqual({
        type: types.DELETE_COMPANY_REVIEWS,
      })
    })
  
    test('should execute delete company reviews success data with company Id', async () => {
      await mock
        .onDelete(`${process.env.REACT_APP_BACKEND_URL}/companyreviews/1`)
        .reply(204)
      const store = mockStore({});
      const actions = store.getActions();
  
      await store.dispatch(deleteCompanyReview(1));
      expect(actions[1]).toEqual({
        type: types.DELETE_COMPANY_REVIEWS_SUCCESS,
        payload: 1,
      })
    })
  
    test('should execute delete company reviews Error data with company Id', async () => {
      const code = 404;
      await mock.onDelete(`${process.env.REACT_APP_BACKEND_URL}/companyreviews/1`).reply(code);
  
      const expectedAction = {
        type: types.DELETE_COMPANY_REVIEWS_FAILURE,
        payload: `Request failed with status code ${code}`,
      }
  
      const store = mockStore({});
      const actions = store.getActions();
      await store.dispatch(deleteCompanyReview(1));
      expect(actions[1]).toEqual(expectedAction);
    })
  })

  //   it('Displays a snapshot for company review', () => {
  //     const { asFragment } = wrapper(<getCompanyReviews />);
  //     expect(wrapper(<getCompanyReviews />).container).toMatchSnapshot();
  //     expect(asFragment()).toMatchSnapshot();
  //   });
});

describe('Action/types salary review testing', () => {
  it('should execute get salary review data', async () => {
    const store = mockStore({});
    const actions = store.getActions();
    await store.dispatch(getSalaryReviews());
    expect(actions[0]).toEqual({ type: types.GET_SALARY_REVIEWS });
  });

  it('should execute fetch salary review data with success', async () => {
    mock
      .onGet(`${process.env.REACT_APP_BACKEND_URL}/salaryreviews/user/1`)
      .reply(200, salaryReview);
    const expectedActions = {
      type: types.GET_SALARY_REVIEWS_SUCCESS,
      payload: salaryReview,
    };
    const store = mockStore({});
    await store.dispatch(getSalaryReviews(1));
    const actions = store.getActions();

    expect(actions[1]).toEqual(expectedActions);
  });

  it('should execute fetch Error data', async () => {
    const code2 = 404;
    mock
      .onGet(`${process.env.REACT_APP_BACKEND_URL}/salaryreviews/user/1`)
      .reply(code2, { message: 'Request failed with status code 404' });
    const expectedAction = {
      type: types.GET_SALARY_REVIEWS_FAILURE,
      payload: `Request failed with status code ${code2}`,
    };
    const store = mockStore({});
    const actions = store.getActions();
    await store.dispatch(getSalaryReviews());
    expect(actions[1]).toEqual(expectedAction);
  });

  // it('Displays a snapshot fo the home page', () => {
  //   const { asFragment } = wrapper(<getSalaryReviews />);
  //   expect(wrapper(<getSalaryReviews />).container).toMatchSnapshot();
  //   expect(asFragment()).toMatchSnapshot();
  // });
});

describe('Action/types interview review testing', () => {
  it('should execute get interview review data data', async () => {
    const store = mockStore({});
    const actions = store.getActions();
    await store.dispatch(getInterviewReviews());
    expect(actions[0]).toEqual({ type: types.GET_INTERVIEW_REVIEWS });
  });

  it('should execute fetch interview review data with success', async () => {
    mock
      .onGet(`${process.env.REACT_APP_BACKEND_URL}/interviewreviews/user/1`)
      .reply(200, interviewReview);
    const expectedActions = {
      type: types.GET_INTERVIEW_REVIEWS_SUCCESS,
      payload: interviewReview,
    };
    const store = mockStore({});
    const actions = store.getActions();
    await store.dispatch(getInterviewReviews(1));
    expect(actions[1]).toEqual(expectedActions);
  });

  it('should execute fetch Error data', async () => {
    const code = 401;
    mock
      .onGet(`${process.env.REACT_APP_BACKEND_URL}/interviewreviews/user/1`)
      .reply(code, interviewReview);
    const expectedAction = {
      type: types.GET_INTERVIEW_REVIEWS_FAILURE,
      payload: `Request failed with status code ${code}`,
    };
    const store = mockStore({});
    const actions = store.getActions();
    await store.dispatch(getInterviewReviews(1));
    expect(actions[1]).toEqual(expectedAction);
  });

  // it('Displays a snapshot fo the home page', () => {
  //   const { asFragment } = wrapper(<getInterviewReviews />);
  //   expect(wrapper(<getInterviewReviews />).container).toMatchSnapshot();
  //   expect(asFragment()).toMatchSnapshot();
  // });
});
