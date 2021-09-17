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
//Step 5 create async and action creator

// export const fetchDataRequest = (data) => {
//   return {
//     type: types.FETCH_DATA_REQUEST,
//     payload: data,
//   };
// };

export const makeFetch = () => (dispatch) => {
  //make your fetch request,
  //when it resolves, take the data and send a dispatch
  let data1 = fetch(
    "http://localhost:9090/api/v1/query_range?query=kafka_server_brokertopicmetrics_bytesin_total&start=2021-09-16T18:50:30.781Z&end=2021-09-16T19:00:00.781Z&step=60s"
    // "http://localhost:9090/api/v1/query?query=kafka_server_brokertopicmetrics_bytesin_total"
  ).then((respose) => respose.json());
  let data2 = fetch(
    "http://localhost:9090/api/v1/query?query=kafka_cluster_partition_underreplicated"
  ).then((respose) => respose.json());

  Promise.all([data1, data2])
    .then((data) => {
      console.log('this is the data from the fetch: ', data)
      dispatch({
        type: types.FETCH_DATA_SUCCESS,
        payload: data,
      });
    })
    .catch(console.error);
};
//"http://localhost:9090/api/v1/query_range?query=kafka_server_brokertopicmetrics_bytesin_total&start=2021-09-16T15:00:30.781Z&end=2021-09-16T15:49:00.781Z&step=15s"(
//how to make this request modular.
// "http://localhost:9090/api/v1/query?query=jmx_scrape_duration_seconds"
//https://jsonplaceholder.typicode.com/users

// Promise.all([
//   fetch("http://localhost:9090/api/v1/query?query=kafka_cluster_partition_replicascount"),
//   fetch("http://localhost:9090/api/v1/query?query=kafka_cluster_partition_underreplicated"),
// ])
//   .then((res) => res.json())
//   .then((data) => {
//     dispatch({
//       type: types.FETCH_DATA_SUCCESS,
//       payload: data,
//     });
//   })
//   .catch(console.error);

// export const makeFetch = () => (dispatch) => {
//   //make your fetch request,
//   //when it resolves, take the data and send a dispatch
//   fetch("http://localhost:9090/metrics")
//     .then((res) => res.json())
//     .then((data) => {
//       dispatch({
//         type: types.FETCH_DATA_SUCCESS,
//         payload: data,
//       });
//     })
//     .catch(console.error);
// };
