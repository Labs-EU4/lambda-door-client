/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import * as types from '../types';

export const getCompanies = () => async dispatch => {
  dispatch({
    type: types.GET_COMPANIES,
  });

  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/companies/`
    );
    dispatch({
      type: types.GET_COMPANIES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: types.GET_COMPANIES_FAILURE,
      payload: error.message || 'Something went wrong.',
    });
  }
};

export const addCompany = company => async dispatch => {
  dispatch({
    type: types.ADD_COMPANY,
  });

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/companies/`,
      company
    );
    dispatch({
      type: types.ADD_COMPANY_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: types.ADD_COMPANY_FAILURE,
      payload: error.message || 'Something went wrong.',
    });
  }
};
