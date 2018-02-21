import {
  ASSIGN_CARS,
  UPDATE_STATUS_ID,
  SET_CAR_SELECTED_INDEX,
  SET_COMMENT,
} from '../actions/types';


const INITIAL_STATE = {
  selected_index: -1,
  cars: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ASSIGN_CARS: {
      return {
        ...state,
        cars: action.payload,
      };
    }
    case UPDATE_STATUS_ID: {
      const { cars, selected_index } = state;
      cars[selected_index].status_id = action.payload;

      return {
        ...state,
        cars,
      };
    }
    case SET_CAR_SELECTED_INDEX: {
      return {
        ...state,
        selected_index: action.payload,
      };
    }
    case SET_COMMENT: {
      const { cars, selected_index } = state;
      cars[selected_index].comment = action.payload;

      return {
        ...state,
        cars,
      };
    }
    default:
      return state;
  }
};
