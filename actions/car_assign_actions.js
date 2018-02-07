import {
  ASSIGN_CARS,
  UPDATE_STATUS,
} from './types';

export const assignCars = payload => ({ type: ASSIGN_CARS, payload });
export const setStatus = payload => ({ type: UPDATE_STATUS, payload });
