import {
  ASSIGN_CARS,
  UPDATE_STATUS,
} from '../actions/types';


const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ASSIGN_CARS: {
      return action.payload;
    }
    case UPDATE_STATUS: {
      return {
        ...state,
        status_id: action.payload,
      };
    }
    default:
      return state;
  }
};
