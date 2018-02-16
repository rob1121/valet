import {Dimensions} from 'react-native';


export const MAIN_COLOR = '#3b5999';
export const ALL_INDEX = -1;
export const WIN_WIDTH = Dimensions.get('window').width;
export const WIN_HEIGHT = Dimensions.get('window').height;

//http://cav-dt-34057:81
export const ROOT_URL = 'http://192.168.1.2/react-native/valet';
export const REGISTER_TOKEN_URL = `${ROOT_URL}/php_reference_only/api/register-token.php`;
export const LOGIN_URL = `${ROOT_URL}/php_reference_only/api/login.php`;
export const CAR_ASSIGN_URL = `${ROOT_URL}/php_reference_only/api/car-assignment.php`;
export const CAR_ASSIGN_FILTER_URL = `${ROOT_URL}/php_reference_only/api/car-assignment-filter.php`;
export const CAR_ASSIGN_UPDATE_URL = `${ROOT_URL}/php_reference_only/api/car-assignment-update.php`;
export const LOCATION_FILTER_URL = `${ROOT_URL}/php_reference_only/api/location-filter.php`;

export const ACTIVE_SCREEN_COLOR = '#222';
export const NOT_ACTIVE_SCREEN_COLOR = '#757575';
export const DISABLE_SCREEN_COLOR = '#cccccc';

export const RAMP_NAV = 'Ramp';
export const HOME_NAV = 'Home';
export const LOGIN_NAV = 'Login';
export const CAR_NAV = 'Car';
export const RAMP_ADD_CAR_NAV = 'RampAddCar';
export const BAR_CODE_NAV = 'BarCode';
