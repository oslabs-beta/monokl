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
    payload: "",
  };
};
//Step 5 create async and action creator

// export const fetchDataRequest = (data) => {
//   return {
//     type: types.FETCH_DATA_REQUEST,
//     payload: data,
//   };
// };

//First: Broker Metrics
export const makeFetch = () => (dispatch) => {
  //Underreplicated partitions(Score Card)
  let data1 = fetch(
    "http://localhost:9090/api/v1/query?query=kafka_cluster_partition_underreplicated"
  ).then((respose) => respose.json());

  //Active Controller Count(Score Card)
  let data2 = fetch(
    "http://localhost:9090/api/v1/query?query=kafka_controller_kafkacontroller_activecontrollercount"
  ).then((respose) => respose.json());

  //Offline Partitions Count (Score Card)
  let data3 = fetch(
    "http://localhost:9090/api/v1/query?query=kafka_controller_kafkacontroller_offlinepartitionscount"
  ).then((respose) => respose.json());

  //Leader Election Rate and Time Ms (Range)
  let data4 = fetch(
    `http://localhost:9090/api/v1/query_range?query=kafka_controller_controllerstats_leaderelectionrateandtimems&start=2021-09-17T10:30:00.781Z&end=${new Date().toISOString()}&step=60s`
  ).then((respose) => respose.json());

  //Total Time (Range)
  let data5 = fetch(
    `http://localhost:9090/api/v1/query_range?query=Kafka_network_requestmetrics_totaltimems&start=2021-09-17T10:30:00.781Z&end=${new Date().toISOString()}&step=60s`
  ).then((respose) => respose.json());

  //Purgatory Size (Range)
  let data6 = fetch(
    `http://localhost:9090/api/v1/query_range?query=kafka_server_delayedoperationpurgatory_purgatorysize&start=2021-09-17T10:30:00.781Z&end=${new Date().toISOString()}&step=60s`
  ).then((respose) => respose.json());

  //Bytes In Total (Range)
  let data7 = fetch(
    `http://localhost:9090/api/v1/query_range?query=kafka_server_brokertopicmetrics_bytesin_total&start=2021-09-17T10:30:00.781Z&end=${new Date().toISOString()}&step=60s`
  ).then((respose) => respose.json());
  //BytesOut Total(Range)
  let data8 = fetch(
    `http://localhost:9090/api/v1/query_range?query=kafka_server_brokertopicmetrics_bytesout_total&start=2021-09-17T10:30:00.781Z&end=${new Date().toISOString()}&step=60s`
  ).then((respose) => respose.json());

  Promise.all([data1, data2, data3, data4, data5, data6, data7, data8])
    .then((allData) => {
      dispatch({
        type: types.FETCH_DATA_SUCCESS,
        payload: allData,
      });
    })
    .catch(console.error);
};
//Second: Producer Metrics
export const makeProducerMetrics = () => (dispatch) => {
  //make your fetch request,
  //when it resolves, take the data and send a dispatch
  let responseRate = fetch(
    "http://localhost:9090/api/v1/query_range?query=kafka_server_brokertopicmetrics_bytesin_total&start=2021-09-16T15:00:30.781Z&end=2021-09-16T15:49:00.781Z&step=60s"
  ).then((respose) => respose.json());
  let requestRate = fetch(
    "http://localhost:9090/api/v1/query?query=kafka_cluster_partition_underreplicated"
  ).then((respose) => respose.json());
  let outgoingBytes = fetch(
    "http://localhost:9090/api/v1/query_range?query=kafka_server_brokertopicmetrics_bytesin_total&start=2021-09-16T15:00:30.781Z&end=2021-09-16T15:49:00.781Z&step=60s"
  ).then((respose) => respose.json());

  Promise.all([responseRate, requestRate, outgoingBytes])
    .then((data) => {
      dispatch({
        type: types.FETCH_CONSUMER_SUCCESS,
        payload: data,
      });
    })
    .catch(console.error);
};

//Third: Consumer Metrics
export const makeConsumerMetricsFetch = () => (dispatch) => {
  //Records Lag / Records Lag Max
  let data1 = fetch(
    "http://localhost:9090/api/v1/query?query=kafka_server_replicafetchermanager_maxlag"
    //`http://localhost:9090/api/v1/query_range?query=kafka_server_replicafetchermanager_maxlag&start=2021-09-17T10:30:00.781Z&end=${new Date().toISOString()}&step=60s`
  ).then((respose) => respose.json());

  Promise.all([data1])
    .then((allData) => {
      dispatch({
        type: types.FETCH_CONSUMER_SUCCESS,
        payload: allData,
      });
    })
    .catch(console.error);
};

//Fourth: Network Metrics
export const makeNetworkMetricsFetch = () => (dispatch) => {
  //Disk usage
  let data1 = fetch(
    "http://localhost:9090/api/v1/query?query=process_virtual_memory_bytes"
    //`http://localhost:9090/api/v1/query_range?query=process_virtual_memory_bytes&start=2021-09-17T10:30:00.781Z&end=${new Date().toISOString()}&step=60s`
  ).then((respose) => respose.json());

  //CPU usage
  let data2 = fetch(
    "http://localhost:9090/api/v1/query?query=process_cpu_seconds_total"
    //`http://localhost:9090/api/v1/query_range?query=process_cpu_seconds_total&start=2021-09-17T10:30:00.781Z&end=${new Date().toISOString()}&step=60s`
  ).then((respose) => respose.json());

  Promise.all([data1, data2])
    .then((allData) => {
      dispatch({
        type: types.FETCH_NETWORK_SUCCESS,
        payload: allData,
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
