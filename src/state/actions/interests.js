/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import * as types from '../types';

export const removeInterest = id => async dispatch => {
  axios.delete(`${process.env.REACT_APP_BACKEND_URL}/interests/ui/${id}`);

  dispatch({
    type: types.DELETE_INTEREST,
    payload: id,
  });
};

export const addInterest = (userId, interestId) => async dispatch => {
  const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/interests`, {
    user_id: userId,
    interest_id: interestId,
  });

  dispatch({
    type: types.ADD_INTEREST,
    payload: response.data,
  });
};

export const getUsersInterests = (id) => async dispatch => {
  dispatch({
    type: types.GET_USER_INTERESTS,
  });

  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/interests/user/${id}`
    );
    dispatch({
      type: types.GET_USER_INTERESTS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: types.GET_USER_INTERESTS_FAILURE,
      payload: error.message || 'Something went wrong.',
    });
  }
};

export const getInterests = () => async dispatch => {
  dispatch({
    type: types.GET_INTERESTS,
  });

  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/interests`
    );
    dispatch({
      type: types.GET_INTERESTS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: types.GET_INTERESTS_FAILURE,
      payload: error.message || 'Something went wrong.',
    });
  }
};
