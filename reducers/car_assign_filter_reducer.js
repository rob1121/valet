import {
  SET_SELECTED_FILTER,
  SET_FILTERS,
} from '../actions/types';


const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_FILTERS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};
