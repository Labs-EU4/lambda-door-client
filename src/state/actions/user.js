/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import * as types from '../types';
import openNotification from '../../utils/openNotification';
import failureNotification from '../../utils/failureNotification';

export const editProfile = (value, id) => async dispatch => {
  dispatch({
    type: types.EDIT_PROFILE_PICTURE,
  });
  try {
    const { data } = await axios.patch(
      `${process.env.REACT_APP_BACKEND_URL}/users/${id}`,
      value
    );
    dispatch({
      type: types.EDIT_PROFILE_PICTURE_SUCCESS,
      payload: data[0],
    });
    openNotification('Profile Updated Succesfully');
  } catch (error) {
    dispatch({
      type: types.EDIT_PROFILE_PICTURE_FAILURE,
      payload: error.message,
    });
    failureNotification('Profile could not be updated');
  }
};
