import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from './../constants/action-type.js';

export function requestLogin() {
  return {
    type: LOGIN_REQUEST,
    msg: 'logic request'
  };
}

export function receiveLogin() {
  return {
    type: LOGIN_SUCCESS,
    msg: 'login sucess'
  };
}

export function rejectLogin() {
  return {
    type: LOGIN_FAILURE,
    msg: 'login fail'
  };
}
