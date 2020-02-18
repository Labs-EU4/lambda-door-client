import axios from 'axios';
import * as types from '../types';

const getSearchResults = request => async dispatch => {
  dispatch({
    type: types.SEARCH,
  });
  try {
    console.log(request);
    const results = await axios({
      method: 'get',
      url: `${process.env.REACT_APP_BACKEND_URL}/search/${request.search_category}`,
      params: {
        search_query: request.search_query,
      },
    });
    console.log(results);
    dispatch({
      type: types.SEARCH_SUCCESS,
      payload: [results.data, request.search_category, request.search_query],
    });
  } catch (error) {
    dispatch({
      type: types.SEARCH_FAILURE,
      payload: error.message,
    });
  }
};

export default getSearchResults;
