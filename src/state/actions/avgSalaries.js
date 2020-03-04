/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import * as types from '../types';

export const getAvgSalaries = id => async dispatch => {
  dispatch({
    type: types.GET_AVG_SALARIES,
  });
  try {
    const response = await axios.get(`
      ${process.env.REACT_APP_BACKEND_URL}/salaryreviews/avg/${id}
    `);

    dispatch({
      type: types.GET_AVG_SALARIES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: types.GET_AVG_SALARIES_FAILURE,
      payload: error.message,
    });
  }
};
