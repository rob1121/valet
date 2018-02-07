import {
  ASSIGN_CARS,
  UPDATE_STATUS,
  SET_CAR_SELECTED_INDEX,
} from './types';

export const assignCars = payload => ({ type: ASSIGN_CARS, payload });
export const setStatus = payload => ({ type: UPDATE_STATUS, payload });
export const setCarSelectedIndex = payload => ({ type: SET_CAR_SELECTED_INDEX, payload });
