/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import * as types from '../types';

export const getTopRatedReviews = () => async dispatch => {
  dispatch({
    type: types.GET_TOP_RATED,
  });

  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/companies/top`
    );
    dispatch({
      type: types.GET_TOP_RATED_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: types.GET_TOP_RATED_FAILURE,
      payload: error.message || 'Something went wrong.',
    });
  }
};
