import {
  SET_SELECTED_FILTER,
  SET_FILTERS,
} from '../actions/types';


const INITIAL_STATE = {
  selected_filter: '',
  filters: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_SELECTED_FILTER: {
      return {
        ...state,
        selected_filter: action.payload,
      };
    }
    case SET_FILTERS: {
      return {
        ...state,
        filters: action.payload,
      }
    }
    default:
      return state;
  }
};
