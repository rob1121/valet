import { combineReducers } from 'redux';
import user from './user_reducer';
import car_assign from './car_assign_reducer';
import car_assign_filter from './car_assign_filter_reducer';

export default combineReducers({
  user, car_assign, car_assign_filter
});
