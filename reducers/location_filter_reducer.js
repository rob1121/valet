import {
  SET_SELECTED_LOCATION,
  SET_LOCATIONS,
} from '../actions/types';


const INITIAL_STATE = {
  locations: [],
  selected_location: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_SELECTED_LOCATION: {
      return {
        ...state,
        selected_location: action.payload,
      };
    }
    case SET_LOCATIONS: {
      return {
        ...state,
        locations: action.payload,
      };
    }
    default:
      return state;
  }
};
