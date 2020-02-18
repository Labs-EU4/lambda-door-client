import axios from 'axios';
import * as types from '../types';
import openNotification from '../../utils/openNotification';
import failureNotification from '../../utils/failureNotification';

export const getReviewsByCompanyId = id => async dispatch => {
  dispatch({
    type: types.GET_SINGLE_COMPANY_REVIEWS,
  });

  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/companyreviews/reviews/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: types.GET_SINGLE_COMPANY_REVIEWS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: types.GET_SINGLE_COMPANY_REVIEWS_FAILURE,
      payload: error.message || 'Something went wrong.',
    });
  }
};

export const getInterviewReviewsByCompanyId = id => async dispatch => {
  dispatch({
    type: types.GET_SINGLE_COMPANY_INTERVIEW_REVIEWS,
  });

  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/interviewreviews/reviews/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: types.GET_SINGLE_COMPANY_INTERVIEW_REVIEWS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: types.GET_SINGLE_COMPANY_INTERVIEW_REVIEWS_FAILURE,
      payload: error.message || 'Something went wrong.',
    });
  }
};

export const getSalaryReviewsByCompanyId = id => async dispatch => {
  dispatch({
    type: types.GET_SINGLE_COMPANY_SALARY_REVIEWS,
  });

  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/salaryreviews/reviews/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: types.GET_SINGLE_COMPANY_SALARY_REVIEWS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: types.GET_SINGLE_COMPANY_SALARY_REVIEWS_FAILURE,
      payload: error.message || 'Something went wrong.',
    });
  }
};

export const getReviewsByReviewId = id => async dispatch => {
  dispatch({
    type: types.GET_SINGLE_REVIEWS,
  });

  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/companyreviews/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: types.GET_SINGLE_REVIEWS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: types.GET_SINGLE_REVIEWS_FAILURE,
      payload: error.message || 'Something went wrong.',
    });
  }
};

export const getInterviewReviewsByReviewId = id => async dispatch => {
  dispatch({
    type: types.GET_SINGLE_INTERVIEW_REVIEWS,
  });

  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/interviewreviews/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: types.GET_SINGLE_INTERVIEW_REVIEWS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: types.GET_SINGLE_INTERVIEW_REVIEWS_FAILURE,
      payload: error.message || 'Something went wrong.',
    });
  }
};

export const getCompanyReviews = id => async dispatch => {
  dispatch({
    type: types.GET_COMPANY_REVIEWS,
  });

  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/companyreviews/user/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: types.GET_COMPANY_REVIEWS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: types.GET_COMPANY_REVIEWS_FAILURE,
      payload: error.message || 'Something went wrong.',
    });
  }
};

export const addCompanyReview = (review, id, history) => async dispatch => {
  dispatch({
    type: types.ADD_COMPANY_REVIEW,
  });

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/companyreviews/${id}`,
      review
    );
    dispatch({
      type: types.ADD_COMPANY_REVIEW_SUCCESS,
      payload: response.data,
    });

    history.push({ pathname: '/reviews', state: 0 });
    openNotification('Review Added Successfully! ');
  } catch (error) {
    dispatch({
      type: types.ADD_COMPANY_REVIEW_FAILURE,
      payload: error.message,
    });
    failureNotification('Review could not be added');
  }
};

export const deleteCompanyReview = id => async dispatch => {
  dispatch({
    type: types.DELETE_COMPANY_REVIEWS,
  });

  try {
    await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/companyreviews/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: types.DELETE_COMPANY_REVIEWS_SUCCESS,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: types.DELETE_COMPANY_REVIEWS_FAILURE,
      payload: error.message || 'Something went wrong.',
    });
  }
};

export const updateCompanyReview = update => async dispatch => {
  dispatch({
    type: types.UPDATE_COMPANY_REVIEWS,
  });

  try {
    const { data } = await axios.patch(
      `${process.env.REACT_APP_BACKEND_URL}/companyreviews/${update.id}`,
      update,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: types.UPDATE_COMPANY_REVIEWS_SUCCESS,
      payload: data,
    });

    openNotification('Review Edited Successfully');
  } catch (error) {
    dispatch({
      type: types.UPDATE_COMPANY_REVIEWS_FAILURE,
      payload: error.message || 'Something went wrong.',
    });
    failureNotification('Review could not be Edited');
  }
};

export const getSalaryReviews = id => async dispatch => {
  dispatch({
    type: types.GET_SALARY_REVIEWS,
  });

  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/salaryreviews/user/${id}`
    );
    dispatch({
      type: types.GET_SALARY_REVIEWS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: types.GET_SALARY_REVIEWS_FAILURE,
      payload: error.message || 'Something went wrong.',
    });
  }
};

export const addSalaryReview = (review, id, history) => async dispatch => {
  dispatch({
    type: types.ADD_SALARY_REVIEW,
  });

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/salaryreviews/`,
      { ...review, user_id: id }
    );
    dispatch({
      type: types.ADD_SALARY_REVIEW_SUCCESS,
      payload: response.data,
    });

    history.push({ pathname: '/reviews', state: 1 });
    openNotification('Review Added Successfully! ');
  } catch (error) {
    dispatch({
      type: types.ADD_SALARY_REVIEW_FAILURE,
      payload: error.message || 'Something went wrong.',
    });
    failureNotification('Review could not be added');
  }
};
export const deleteSalaryReview = (id, history) => async dispatch => {
  dispatch({
    type: types.DELETE_SALARY_REVIEWS,
  });

  try {
    await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/salaryreviews/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: types.DELETE_SALARY_REVIEWS_SUCCESS,
      payload: id,
    });
    history.push(`/reviews/`);
    openNotification('Review deleted successfully!');
  } catch (error) {
    dispatch({
      type: types.DELETE_SALARY_REVIEWS_FAILURE,
      payload: error.message || 'Something went wrong.',
    });
    failureNotification('Review could not be deleted');
    console.log(error.message);
  }
};

export const updateSalaryReview = update => async dispatch => {
  dispatch({
    type: types.UPDATE_COMPANY_REVIEWS,
  });

  try {
    const { data } = await axios.patch(
      `${process.env.REACT_APP_BACKEND_URL}/salaryreviews/${update.id}`,
      update,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: types.UPDATE_SALARY_REVIEWS_SUCCESS,
      payload: data,
    });

    openNotification('Review updated successfully!');
  } catch (error) {
    dispatch({
      type: types.UPDATE_SALARY_REVIEWS_FAILURE,
      payload: error.message || 'Something went wrong.',
    });
    failureNotification('Review could not be updated');
  }
};

export const getInterviewReviews = id => async dispatch => {
  dispatch({
    type: types.GET_INTERVIEW_REVIEWS,
  });

  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/interviewreviews/user/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: types.GET_INTERVIEW_REVIEWS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: types.GET_INTERVIEW_REVIEWS_FAILURE,
      payload: error.message || 'Something went wrong.',
    });
  }
};

export const addInterviewReview = (review, id, history) => async dispatch => {
  dispatch({
    type: types.ADD_INTERVIEW_REVIEW,
  });

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/interviewreviews/`,
      { ...review, user_id: id }
    );
    dispatch({
      type: types.ADD_INTERVIEW_REVIEW_SUCCESS,
      payload: response.data,
    });
    history.push({ pathname: '/reviews', state: 2 });
    openNotification('Review Added Successfully! ');
  } catch (error) {
    dispatch({
      type: types.ADD_INTERVIEW_REVIEW_FAILURE,
      payload: error.message || 'Something went wrong.',
    });
    failureNotification('Review could not be added');
  }
};

export const deleteInterviewReview = id => async dispatch => {
  dispatch({
    type: types.DELETE_INTERVIEW_REVIEW,
  });

  try {
    await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/interviewreviews/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: types.DELETE_INTERVIEW_REVIEW_SUCCESS,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: types.DELETE_INTERVIEW_REVIEW_FAILURE,
      payload: error.message || 'Something went wrong.',
    });
  }
};

export const updateInterviewReview = update => async dispatch => {
  dispatch({
    type: types.UPDATE_INTERVIEW_REVIEW,
  });

  try {
    const { data } = await axios.patch(
      `${process.env.REACT_APP_BACKEND_URL}/interviewreviews/${update.id}`,
      update,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: types.UPDATE_INTERVIEW_REVIEW_SUCCESS,
      payload: data,
    });
    openNotification('Review Updated Successfully');
  } catch (error) {
    dispatch({
      type: types.UPDATE_INTERVIEW_REVIEW_FAILURE,
      payload: error.message || 'Something went wrong.',
    });
    failureNotification('Review could not be updated');
  }
};
