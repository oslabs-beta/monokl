import * as types from "./actionTypes.js";

//action creators below
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
export const fetchBrokerMetrics = () => (dispatch) => {
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
        type: types.FETCH_BROKER_SUCCESS,
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
  //Average Idle percentage: source
  let data1 = fetch(
    `http://localhost:9090/api/v1/query_range?query=kafka_network_socketserver_networkprocessoravgidlepercent&start=2021-09-19T17:37:11.716Z&end=${new Date().toISOString()}&step=60s`
  ).then((respose) => respose.json());

  //CPU usage
  let data2 = fetch(
    "http://localhost:9090/api/v1/query?query=process_cpu_seconds_total"
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

//Sources for Metrics:
//https://access.redhat.com/documentation/en-us/red_hat_amq/7.3/html/using_amq_streams_on_red_hat_enterprise_linux_rhel/monitoring-str
//https://www.datadoghq.com/blog/monitoring-kafka-performance-metrics/#host-level-broker-metrics
//https://docs.confluent.io/platform/current/kafka/monitoring.html
//https://stackoverflow.com/questions/63392855/how-to-interpret-kafka-broker-reported-latency-metrics
