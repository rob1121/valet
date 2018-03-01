import {
  SET_CAR_INFO,
  UPDATE_CAR_VALUE,
} from '../actions/types';

const INITIAL_STATE = {
  //order
  uid: '',
  car_category: 'transient',
  folio_number: '',
  guess_name: '',
  room_number:'',
  checkout_date: '',
  name: '',
  delidate: '',
  opt: '',
  ticketno: '',
  platno: '',
  make: '',
  model: '',
  comment: '',
  customercontactno: '',
  image: '',
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
