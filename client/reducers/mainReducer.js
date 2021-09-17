import * as types from "../actions/actionTypes.js";
//Step 1, create a state property of  data and create a case in mainreducer

const initialState = {
  count: 0,
  connectionTime: 0,
  port: "",
  data: [],
  bytesIn: 0,
  // clusterHealth: {
  //   metric1: action.payload[0].data.metric,
  //   value: action.payload[0].data.result[0].value,
  //   metric2: action.payload[1].data.metric,
  //   value: action.payload[1].data.result[0].value,
  // },
};

const mainReducer = (state = initialState, action) => {
  // console.log("From mainReducer.js: ", state);
  switch (action.type) {
    case types.ADD_COUNT:
      return {
        ...state,
        count: state.count + action.payload, //should be hardcoded to 1
      };
    case types.ADD_PORT:
      return {
        ...state,
        connectionTime: Date.now(),
        port: action.payload,
      };
    //case for Fetch Data
    case types.FETCH_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
        bytesIn: action.payload[0].data.result[0].values,
      };

    case types.ADD_PRODUCER_DATA:
      return {
        ...state,
        responseRate: action.payload,
        requestRate: action.payload,
        outgoingBytes: action.payload,
      }

    default:
      return state;
  }
};

export default mainReducer;
//send this to index.js inside reducers folder
