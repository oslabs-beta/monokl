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

export const addConnectionTimeAction = (timestamp) => {
  return {
    type: types.ADD_CONNECTION_TIME,
    payload: timestamp,
  };
};

//First: Broker Metrics
export const fetchBrokerMetics = () => (dispatch) => {
  //0.Underreplicated partitions(Score Card)
  let data0 = fetch(
    "http://localhost:9090/api/v1/query?query=kafka_server_replicamanager_underreplicatedpartitions"
  ).then((respose) => respose.json());

  //1.Active Controller Count(Score Card)
  let data1 = fetch(
    "http://localhost:9090/api/v1/query?query=kafka_controller_kafkacontroller_activecontrollercount"
  ).then((respose) => respose.json());

  //2.Offline Partitions Count (Score Card)
  let data2 = fetch(
    "http://localhost:9090/api/v1/query?query=kafka_controller_kafkacontroller_offlinepartitionscount"
  ).then((respose) => respose.json());

  //3.Leader Election Rate and Time Ms (Range)
  let data3 = fetch(
    `http://localhost:9090/api/v1/query_range?query=kafka_controller_controllerstats_leaderelectionrateandtimems_count&start=2021-09-18T10:30:00.781Z&end=${new Date().toISOString()}&step=60s`
  ).then((respose) => respose.json());

  //4.Total Time (Range) //{request=""FetchConsumer"}
  let data4 = fetch(
    `http://localhost:9090/api/v1/query_range?query=kafka_network_requestmetrics_totaltimems{request="FetchConsumer"}&start=2021-09-18T10:30:00.781Z&end=${new Date().toISOString()}&step=60s`
  ).then((respose) => respose.json());

  //5.Purgatory Size (Range) {delayedOperation="Fetch"}
  let data5 = fetch(
    `http://localhost:9090/api/v1/query_range?query=kafka_server_delayedoperationpurgatory_purgatorysize{delayedOperation="Fetch"}&start=2021-09-18T10:30:00.781Z&end=${new Date().toISOString()}&step=60s`
  ).then((respose) => respose.json());

  //6.Bytes In Total (Range)
  let data6 = fetch(
    `http://localhost:9090/api/v1/query_range?query=kafka_server_brokertopicmetrics_bytesin_total&start=2021-09-18T10:30:00.781Z&end=${new Date().toISOString()}&step=60s`
  ).then((respose) => respose.json());
  //7.BytesOut Total(Range)
  let data7 = fetch(
    `http://localhost:9090/api/v1/query_range?query=kafka_server_brokertopicmetrics_bytesout_total&start=2021-09-18T10:30:00.781Z&end=${new Date().toISOString()}&step=60s`
  ).then((respose) => respose.json());

  Promise.all([data0, data1, data2, data3, data4, data5, data6, data7])
    .then((allData) => {
      dispatch({
        type: types.FETCH_DATA_SUCCESS,
        payload: allData,
      });
    })
    .catch(console.error);
};
//Second: Producer Metrics
export const fetchProducerMetrics = () => (dispatch) => {
  //0.Total Time (Range) //{request="Produce"}- this measures number of Produce requests that were measured since the broker went up
  let data0 = fetch(
    `http://localhost:9090/api/v1/query_range?query=kafka_network_requestmetrics_totaltimems{request="Produce"}&start=2021-09-18T10:30:00.781Z&end=${new Date().toISOString()}&step=60s`
  ).then((respose) => respose.json());

  //1. Total Producer Requests Total (Aggregate)
  let data1 = fetch(
    `http://localhost:9090/api/v1/query_range?query=kafka_server_brokertopicmetrics_totalproducerequests_total&start=2021-09-18T10:30:00.781Z&end=${new Date().toISOString()}&step=60s`
  ).then((respose) => respose.json());

  //2. Failed Producer Requests (Aggregate)
  let data3 = fetch(
    `http://localhost:9090/api/v1/query_range?query=kafka_server_brokertopicmetrics_failedproducerequests_total&start=2021-09-18T10:30:00.781Z&end=${new Date().toISOString()}&step=60s`
  ).then((respose) => respose.json());

  Promise.all([data0, data1, data3])
    .then((allData) => {
      dispatch({
        type: types.FETCH_PRODUCER_SUCCESS,
        payload: allData,
      });
    })
    .catch(console.error);
};

//Third: Consumer Metrics
export const fetchConsumerMetrics = () => (dispatch) => {
  //0.Total Time MS {Consumer}
  let data0 = fetch(
    `http://localhost:9090/api/v1/query_range?query=kafka_network_requestmetrics_totaltimems{request="FetchConsumer"}&start=2021-09-18T10:30:00.781Z&end=${new Date().toISOString()}&step=60s`
  ).then((respose) => respose.json());

  Promise.all([data0])
    .then((allData) => {
      dispatch({
        type: types.FETCH_CONSUMER_SUCCESS,
        payload: allData,
      });
    })
    .catch(console.error);
};

//Fourth: Network Metrics
export const fetchNetworkMetrics = () => (dispatch) => {
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
