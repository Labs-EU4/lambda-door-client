/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import * as types from '../types';

export const getClosestCompanies = id => async dispatch => {
  dispatch({
    type: types.GET_CLOSEST_COMPANIES,
  });

  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/companies/${id}/closest`
    );
    dispatch({
      type: types.GET_CLOSEST_COMPANIES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: types.GET_CLOSEST_COMPANIES_FAILURE,
      payload: error.message || 'Something went wrong.',
    });
  }
};
