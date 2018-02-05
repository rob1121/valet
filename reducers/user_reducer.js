import {
  SET_USER,
  LOGOUT_USER,
  SET_PASSWORD,
  SET_USERNAME,
} from '../actions/types';


const INITIAL_STATE = {
  username: '',
  password: '',
  name: '',
  user_type: '',
  id: -1,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case LOGOUT_USER: {
      return {
        ...state,
        user: INITIAL_STATE,
      };
    }
    case SET_USERNAME: {
      return {
        ...state,
        user: {
          ...state.user,
          username: action.payload,
        },
      };
    }
    case SET_PASSWORD: {
      return {
        ...state,
        user: {
          ...state.user,
          password: action.payload,
        },
      };
    }
    default:
      return state;
  }
};
