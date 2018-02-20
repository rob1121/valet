import {
  SET_CAR_INFO,
  UPDATE_CAR_VALUE,
} from '../actions/types';


import {
  DEFAULT_IMG
} from '../constants';

const INITIAL_STATE = {
  //order
  uid: '',
  car_category: 'transient',
  name: '',
  delidate: '',
  opt: '',
  ticketno: '',
  platno: '',
  make: '',
  model: '',
  customercontactno: '',
  image: DEFAULT_IMG,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CAR_INFO: {
      return {
        ...state,
        ...action.payload
      };
    }
    default:
      return state;
  }
};
