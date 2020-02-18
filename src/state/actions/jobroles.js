/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import * as types from '../types';

export const getJobRoles = () => async dispatch => {
  dispatch({
    type: types.GET_JOB_ROLES,
  });
  try {
    const { data } = await axios.get(`
      ${process.env.REACT_APP_BACKEND_URL}/dataDisplay
    `);
    dispatch({
      type: types.GET_JOB_ROLES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: types.GET_JOB_ROLES_FAILURE,
      payload: error.message,
    });
  }
};
