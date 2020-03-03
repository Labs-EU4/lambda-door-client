/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import * as types from '../types';

export const getHighestSalary = () => async dispatch => {
  dispatch({
    type: types.GET_HIGHEST,
  });
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/salaryreviews/highest/`
    );
    dispatch({
      type: types.GET_HIGHEST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: types.GET_HIGHEST_FAILURE,
      payload: error.message || 'Error getting highest salaries',
    });
  }
};
