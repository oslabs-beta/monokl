import * as types from "./actionTypes.js";

//action creators below
export const addPortAction = (userPort) => {
  return {
    type: types.ADD_PORT,
    payload: userPort,
  };
};

export const removePortAction = () => {
  return {
    type: types.REMOVE_PORT,
    payload: "",
  };
};

export const addConnectionTimeAction = (timestamp) => {
  return {
    type: types.ADD_CONNECTION_TIME,
    payload: timestamp,
  };
};

