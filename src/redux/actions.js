import {ADD_USER, DELETE_USER, EDIT_USER} from './actionTypes';

let nextUserId = 0;

export const addUser = (
  photo,
  name,
  emailId,
  mobile,
  birthDate,
  latitude,
  longitude,
) => ({
  type: ADD_USER,
  payload: {
    id: ++nextUserId,
    photo,
    name,
    emailId,
    mobile,
    birthDate,
    latitude,
    longitude,
  },
});

export const deleteUser = id => ({
  type: DELETE_USER,
  payload: {
    id,
  },
});

export const editUser = user => ({
  type: EDIT_USER,
  payload: {
    user,
  },
});
