import {
  SET_SELECTED_LOCATION,
  SET_LOCATIONS,
} from './types';

export const setSelectedLocation = payload => ({ type: SET_SELECTED_LOCATION, payload });
export const setLocations = payload => ({ type: SET_LOCATIONS, payload });
