import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS
} from "../constants/actions";


function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
      isFetching: true,
      apiType: 'Auth'
    isAuthenticated: false,
    creds
  };
}

function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
      isFetching: false,
      apiType: 'Auth',
    isAuthenticated: true,
    token: user.token,
    user: user
  };
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
      isAuthenticated: false,
      apiType: 'Auth',
    message: message
  };
}

// Logout actions

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
      isFetching: true,
      apiType: 'Auth',
    isAuthenticated: true
  };
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
      isFetching: false,
      apiType: 'Auth',
    isAuthenticated: false
  };
}

// Logs the user out
export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(receiveLogout());
  };
}
