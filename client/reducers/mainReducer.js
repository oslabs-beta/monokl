import * as types from "../actions/actionTypes.js";

const initialState = {
  count: 0,
  port: "",
};

const mainReducer = (state = initialState, action) => {
  console.log("From mainReducer.js: ", state);
  switch (action.type) {
    case types.ADD_COUNT:
      return {
        ...state,
        count: state.count + action.payload, //should be hardcoded to 1
      };
    case types.ADD_PORT:
      return {
        ...state,
        port: action.payload,
      };

    default:
      return state;
  }
};

export default mainReducer;
//send this to index.js inside reducers folder
