import {
  ASSIGN_CARS,
  UPDATE_STATUS_ID,
  SET_CAR_SELECTED_INDEX,
  SET_COMMENT,
} from './types';

export const assignCars = payload => ({ type: ASSIGN_CARS, payload });
export const setStatusId = payload => ({ type: UPDATE_STATUS_ID, payload });
export const setCarSelectedIndex = payload => ({ type: SET_CAR_SELECTED_INDEX, payload });
export const setComment = payload => ({type: SET_COMMENT, payload})
