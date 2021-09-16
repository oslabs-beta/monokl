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
    "http://localhost:9090/api/v1/query?query=kafka_cluster_partition_replicascount"
  ).then((respose) => respose.json());
  let data2 = fetch(
    "http://localhost:9090/api/v1/query?query=kafka_cluster_partition_underreplicated"
  ).then((respose) => respose.json());

  Promise.all([data1, data2])
    // .then((allData) => {
    //   // let print = allData[0].json();
    //   // console.log("Fetch AllData: ", print);
    //   return allData[0].json();
    // })
    .then((data) => {
      console.log("Second then", data);
      dispatch({
        type: types.FETCH_DATA_SUCCESS,
        payload: data,
      });
    })
    .catch(console.error);
};

//how to make this request modular.
("http://localhost:9090/api/v1/query?query=jmx_scrape_duration_seconds");
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
