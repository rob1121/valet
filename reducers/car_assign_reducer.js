import {
  ASSIGN_CARS,
  UPDATE_STATUS,
  SET_CAR_SELECTED_INDEX,
} from '../actions/types';


const INITIAL_STATE = {
  selected_index: 0,
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
    case UPDATE_STATUS: {
      const { cars, selected_index } = state;
      cars[selected_index].status = action.payload;

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
    default:
      return state;
  }
};
