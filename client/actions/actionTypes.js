import * as types from "./actionTypes.js";

//action creators below
export const addCountAction = () => {
  return {
    type: types.ADD_COUNT,
    payload: 1,
  };
};
