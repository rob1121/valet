import { combineReducers } from 'redux';
import user from './user_reducer';
import car_assign from './car_assign_reducer';
import location_filter from './location_filter_reducer';
import nav from './navigation_reducer';
import car from './car_info_reducer';
import error from './error_reducer';

export default combineReducers({
  user, car, car_assign, location_filter, nav, error
});
