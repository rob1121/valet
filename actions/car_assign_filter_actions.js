import {
  SET_SELECTED_FILTER,
  SET_FILTERS,
} from './types';

export const setSelectedFilter = payload => ({ type: SET_SELECTED_FILTER, payload });
export const setFilters = payload => ({ type: SET_FILTERS, payload });
