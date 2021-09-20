import * as types from "../actions/actionTypes.js";

const initialState = {
  connectionTime: '',
  port: "",
  data: [],
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_PORT:
      return {
        ...state,
        port: action.payload,
      };
    case types.REMOVE_PORT:
      return {
        ...state,
        port: action.payload,
      };
    case types.ADD_CONNECTION_TIME:
      return {
        ...state,
        connectionTime: action.payload,
      };
    default:
      return state;
  }
};

export default mainReducer;

