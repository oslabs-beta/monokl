import * as types from "../constants/actionTypes.js";

const initialState = {
  count: 0,
};

const mainReducer = (state = initialState, action) => {
  console.log("From mainReducer.js: ", state);
  switch (action.type) {
    case types.ADD_ITEM:
      return {
        ...state,
        count: state.count + action.payload, //should be hardcoded to 1
      };

    default:
      return state;
  }
};

export default mainReducer;
//send this to index.js inside reducers folder