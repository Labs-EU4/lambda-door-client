import * as types from '../types';

const initialState = {
  isSearching: false,
  searchResults: [],
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SEARCH:
      return { ...state, isSearching: true };
    case types.SEARCH_SUCCESS:
      console.log('payload', action.payload);
      return { isSearching: false, searchResults: action.payload };
    case types.SEARCH_FAILURE:
      return { ...state, isSearching: false };
    default:
      return state;
  }
};

export default searchReducer;
