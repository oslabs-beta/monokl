// import * as types from "./actionTypes.js";

// //action creators below
// export const addCountAction = () => {
//   return {
//     type: types.ADD_COUNT,
//     payload: 1,
//   };
// };

// export const addPortAction = (userPort) => {
//   return {
//     type: types.ADD_PORT,
//     payload: userPort,
//   };
// };

// //Step 5 create async and action creator


// export const fetchProducerMetrics = () => (dispatch) => {
//   //make your fetch request,
//   //when it resolves, take the data and send a dispatch
//   let responseRate = fetch(
//     "http://localhost:9090/api/v1/query_range?query=kafka_server_brokertopicmetrics_bytesin_total&start=2021-09-16T15:00:30.781Z&end=2021-09-16T15:49:00.781Z&step=60s"
//   ).then((respose) => respose.json());
//   let requestRate = fetch(
//     "http://localhost:9090/api/v1/query?query=kafka_cluster_partition_underreplicated"
//   ).then((respose) => respose.json());
//   let outgoingBytes = fetch(
//     "http://localhost:9090/api/v1/query_range?query=kafka_server_brokertopicmetrics_bytesin_total&start=2021-09-16T15:00:30.781Z&end=2021-09-16T15:49:00.781Z&step=60s"
//   ).then((respose) => respose.json());

//   Promise.all([responseRate, requestRate, outgoingBytes])
//     .then((data) => {
//       dispatch({
//         type: types.ADD_PRODUCER_DATA,
//         payload: data,
//       });
//     })
//     .catch(console.error);
// };
