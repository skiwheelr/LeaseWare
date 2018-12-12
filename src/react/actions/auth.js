import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS
} from "../constants/actions";


export function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
      isFetching: true,
      apiType: 'Auth',
      payload: creds
  };
}
export function receiveLogin(creds) {
   
    return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    apiType: 'Auth',
    isAuthenticated: true,
    token: creds.Token,
    payload: creds
  };
}
export function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
      isAuthenticated: false,
      apiType: 'Auth',
    message: message
  };
}
// Logout actions
export function requestLogout(creds) {
  return {
    type: LOGOUT_REQUEST,
      isFetching: true,
      apiType: 'Auth',
      isAuthenticated: true,
      payload: creds
  };
}

export function receiveLogout() {
    let loggedOut = {
	Code: '',
	Password: '',
	Blowfish: false,
	Office: null,
	Token: ''
    }    
  return {
    type: LOGOUT_SUCCESS,
      isFetching: false,
      apiType: 'Auth',
      token: '',
      isAuthenticated: false,
      payload: loggedOut
  };
}
// Logs the user out
export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout());
  };
}
