import * as types from "./actionTypes.js";

//action creators below
export const addCountAction = () => {
  return {
    type: types.ADD_COUNT,
    payload: 1,
  };
};

export const addPortAction = (userPort) => {
  return {
    type: types.ADD_PORT,
    payload: userPort,
  };
};

export const removePortAction = () => {
  return {
    type: types.REMOVE_PORT,
    payload: '',
  };
};
