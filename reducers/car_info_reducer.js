import {
  SET_CAR_INFO,
  RESET_CAR_INFO,
} from '../actions/types';

const INITIAL_STATE = {
  //order
  uid: '',
  car_category: 'hotel',
  folio_number: '',
  customer: '',
  guest_name: '',
  room_number:'',
  checkout_date: '',
  name: '',
  contact_no: '',
  opt: '',
  ticketno: '',
  plateno: '',
  make: '',
  model: '',
  comment: '',
  location: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CAR_INFO: {
      return {
        ...state,
        ...action.payload
      };
    }
    case RESET_CAR_INFO: {
      return INITIAL_STATE
    }
    default:
      return state;
  }
};
