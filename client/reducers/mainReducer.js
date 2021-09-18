import * as types from "../actions/actionTypes.js";
//Step 1, create a state property of  data and create a case in mainreducer

const initialState = {
  count: 0,
  connectionTime: 0,
  port: "9092",
  data: [],
  //Broker Metrics
  underReplicatedPartitions: [],
  activeControllerCount: 0,
  offlinePartitionsCount: 0,
  leaderElectionRateAndTimeMs: [],
  totalTimeMS: 0,
  purgatorySize: 0,
  bytesIn: 0,
  bytesOut: 0,
  //Producer Metrics
  responseRate: 0,
  requestRate: 0,
  outgoingByteRate: 0,
  //Consumer Metrics
  recordsLag: 0,
  //NetworkMetrics
  cpuUsage: 0,
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
    case types.REMOVE_PORT:
      return {
        ...state,
        port: action.payload,
      };
    //case for Fetch Data(Broker Metric)
    case types.FETCH_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
        underReplicatedPartitions: action.payload[0].data.result[0].value[1],
        activeControllerCount: action.payload[1].data.result[0].value[1],
        offlinePartitionsCount: 0,
        leaderElectionRateAndTimeMs: action.payload[3].data.result[0].values,
        bytesIn: action.payload[7].data.result[0].values,
      };
    //case for Producer Metrics
    case types.FETCH_PRODUCER_SUCCESS:
      return {
        ...state,
        responseRate: action.payload,
        requestRate: action.payload,
        outgoingByteRate: action.payload,
      };
    //case for Consumer Metrics
    case types.FETCH_CONSUMER_SUCCESS:
      return {
        ...state,
        recordsLag: action.payload,
      };
    //case for Network Metrics
    case types.FETCH_NETWORK_SUCCESS:
      return {
        ...state,
        cpuUsage: action.payload,
      };
    default:
      return state;
  }
};

export default mainReducer;
//send this to index.js inside reducers folder
