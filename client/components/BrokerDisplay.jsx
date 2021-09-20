import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import BarChart from "./charts/BarChart.jsx";
import LineChart from "./charts/LineChart.jsx";
import ScoreCard from "./charts/ScoreCard.jsx";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: "1",
    marginTop: "50px",
    alignItems: "center",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

//after getting data and storing it in state..
//use a mapstatetoprops to pass data to both line charts
const mapStateToProps = (state) => {
  return {
    port: state.mainReducer.port,
    connectionTime: state.mainReducer.connectionTime
  };
};

function BrokerDisplay(props) {
  const classes = useStyles();

  const [underReplicatedPartitions, setURP] = useState([]);
  const [activeControllerCount, setActiveController] = useState([]);
  const [offlinePartitions, setOfflinePartitions] = useState([]);
  const [xArrayLeader, setXArrayLeader] = useState([]);
  const [yArrayLeader, setYArrayLeader] = useState([]);
  const [xArrayTTFetch, setXArrayTTFetch] = useState([]);
  const [yArrayTTFetch, setYArrayTTFetch] = useState([]);
  const [xArrayPurg, setXArrayPurg] = useState([]);
  const [yArrayPurg, setYArrayPurg] = useState([]);
  const [xArrayIn, setXArrayIn] = useState([]);
  const [yArrayIn, setYArrayIn] = useState([]);
  const [xArrayOut, setXArrayOut] = useState([]);
  const [yArrayOut, setYArrayOut] = useState([]);

  // //Leader Election Rate
  // const xArrayLeader = props.leaderElectionRateAndTimeMs.map((data) => {
  //   let date = new Date(data[0]);
  //   return date.getTime();
  // });
  // const yArrayLeader = props.leaderElectionRateAndTimeMs.map((data) =>
  //   Number(data[1])
  // );
  // //Total Time Fetch
  // const xArrayTTFetch = props.totalTimeMS.data.result[0].values.map((data) => {
  //   let date = new Date(data[0]);
  //   return date.getTime();
  // });
  // const yArrayTTFetch = props.totalTimeMS.data.result[0].values.map((data) =>
  //   Number(data[1])
  // );

  // //Purgatory Fetch
  // const xArrayPurg = props.purgatorySize.map((data) => {
  //   let date = new Date(data[0]);
  //   return date.getTime();
  // });
  // const yArrayPurg = props.purgatorySize.map((data) => Number(data[1]));
  
  // //Bytes In
  // const xArray = props.bytesIn.map((data) => {
  //   let date = new Date(data[0]);
  //   return date.getTime();
  // });
  // const yArray = props.bytesIn.map((data) => Number(data[1]));

  // //bytesOut
  // const xArrayOut = props.bytesOut.map((data) => {
  //   let date = new Date(data[0]);
  //   return date.getTime();
  // });
  // const yArrayOut = props.bytesOut.map((data) => Number(data[1]));

  useEffect(() => {
    let underReplicated = fetch(
      `http://localhost:${props.port}/api/v1/query?query=kafka_server_replicamanager_underreplicatedpartitions`
    ).then((respose) => respose.json());
  
    //1.Active Controller Count(Score Card)
    let activeController = fetch(
      `http://localhost:${props.port}/api/v1/query?query=kafka_controller_kafkacontroller_activecontrollercount`
    ).then((respose) => respose.json());
  
    //2.Offline Partitions Count (Score Card)
    let offlinePartitions = fetch(
      `http://localhost:${props.port}/api/v1/query?query=kafka_controller_kafkacontroller_offlinepartitionscount`
    ).then((respose) => respose.json());
  
    //3.Leader Election Rate and Time Ms (Range)
    let leaderElectionRateMs = fetch(
      `http://localhost:${props.port}/api/v1/query_range?query=kafka_controller_controllerstats_leaderelectionrateandtimems_count&start=${props.connectionTime}&end=${new Date().toISOString()}&step=60s`
    ).then((respose) => respose.json());
  
    //4.Total Time (Range) //{request=""FetchConsumer"}
    let fetchConsumerTime = fetch(
      `http://localhost:${props.port}/api/v1/query_range?query=kafka_network_requestmetrics_totaltimems{request="FetchConsumer"}&start=${props.connectionTime}&end=${new Date().toISOString()}&step=60s`
    ).then((respose) => respose.json());
  
    //5.Purgatory Size (Range) {delayedOperation="Fetch"}
    let purgatorySizeFetch = fetch(
      `http://localhost:${props.port}/api/v1/query_range?query=kafka_server_delayedoperationpurgatory_purgatorysize{delayedOperation="Fetch"}&start=${props.connectionTime}&end=${new Date().toISOString()}&step=60s`
    ).then((respose) => respose.json());
  
    //6.Bytes In Total (Range)
    let bytesIn = fetch(
      `http://localhost:${props.port}/api/v1/query_range?query=kafka_server_brokertopicmetrics_bytesin_total&start=${props.connectionTime}&end=${new Date().toISOString()}&step=60s`
    ).then((respose) => respose.json());
    //7.BytesOut Total(Range)
    let bytesOut = fetch(
      `http://localhost:${props.port}/api/v1/query_range?query=kafka_server_brokertopicmetrics_bytesout_total&start=${props.connectionTime}&end=${new Date().toISOString()}&step=60s`
    ).then((respose) => respose.json());

    Promise.all([underReplicated, activeController, offlinePartitions, leaderElectionRateMs, fetchConsumerTime, purgatorySizeFetch, bytesIn, bytesOut])
      .then((allData) => {
        // Under Replicated Partitions Chart
        setURP(allData[0].data.result[0].value[1])
        
        // Active Controller Count Chart
        setActiveController(allData[1].data.result[0].value[1])
        
        // Offline Partitions Count Chart
        setOfflinePartitions(allData[2].data.result[0].value[1])
        
        // Leader Election Rate Ms Chart
        setXArrayLeader(allData[3].data.result[0].values.map((data) => {
          let date = new Date(data[0]);
          return date.getTime()
        }))
        setYArrayLeader(allData[3].data.result[0].values.map((data) => Number(data[1])))
        
        // Fetch Consumer Time Chart
        setXArrayTTFetch(allData[4].data.result[0].values.map((data) => {
          let date = new Date(data[0]);
          return date.getTime();
        }));
        setYArrayTTFetch(allData[4].data.result[0].values.map((data) => Number(data[1])));

        // Purgatory Size Chart
        setXArrayPurg(allData[5].data.result[0].values.map((data) => {
          let date = new Date(data[0]);
          return date.getTime();
        }));
        setYArrayPurg(allData[5].data.result[0].values.map((data) => Number(data[1])));

        // Bytes In Chart
        setXArrayIn(allData[6].data.result[0].values.map((data) => {
          let date = new Date(data[0]);
          return date.getTime();
        }));
        setYArrayIn(allData[6].data.result[0].values.map((data) => Number(data[1])));

        // Bytes Out Chart
        setXArrayOut(allData[7].data.result[0].values.map((data) => {
          let date = new Date(data[0]);
          return date.getTime();
        }));
        setYArrayOut(allData[7].data.result[0].values.map((data) => Number(data[1])));
      })
      .catch(console.error)
  }, [])

  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={3} className={classes.parent}>
          <Grid item xs={12}>
            Broker Metrics
          </Grid>
          {/* Metric 0: "Under Replicated Partitions" */}
          <Grid item xs={4} className={classes.child}>
            <Paper className={classes.paper}>
              <ScoreCard
                data={underReplicatedPartitions}
                metricName={"Under Replicated Partitions"}
              />
            </Paper>
          </Grid>
          {/* Metric 1: "Active Controller Count" */}
          <Grid item xs={4} className={classes.child}>
            <Paper className={classes.paper}>
              <ScoreCard
                data={activeControllerCount}
                metricName={"Active Controller Count"}
              />
            </Paper>
          </Grid>
          {/* Metric 2: "Offline Partition Count" */}
          <Grid item xs={4} className={classes.child}>
            <Paper className={classes.paper}>
              <ScoreCard
                data={offlinePartitions}
                metricName={"Offline Partition Count"}
              />
            </Paper>
          </Grid>
          {/* Metric 3: "Leader Election Rate and Time Ms" */}
          <Grid item xs={12} className={classes.child}>
            <Paper className={classes.paper}>
              <LineChart
                metricName={"Leader Election Rate and Time Ms"}
                x={xArrayLeader}
                y={yArrayLeader}
              />
            </Paper>
          </Grid>
          {/* Metric4: "Total Time Ms" FetchConsumer  50th quartile*/}
          <Grid item xs={12} className={classes.child}>
            <Paper className={classes.paper}>
              <LineChart
                metricName={"Total Time Ms FetchConsumer 50th"}
                x={xArrayTTFetch}
                y={yArrayTTFetch}
              />
            </Paper>
          </Grid>
          {/* Metric5: "Purgatory Size" */}
          <Grid item xs={12} className={classes.child}>
            <Paper className={classes.paper}>
              <LineChart
                metricName={"Purgatory Size Fetch Request"}
                x={xArrayPurg}
                y={yArrayPurg}
              />
            </Paper>
          </Grid>
          {/* Metric6: "Bytes In Per Sec" */}
          <Grid item xs={6} className={classes.child}>
            <Paper className={classes.paper}>
              <LineChart
                metricName={"Bytes In Per Sec"}
                x={xArrayIn}
                y={yArrayIn}
              />
            </Paper>
          </Grid>
          {/* Metric7: "Bytes Out Per Sec" */}
          <Grid item xs={6} className={classes.child}>
            <Paper className={classes.paper}>
              <LineChart
                metricName={"Bytes Out Per Sec"}
                x={xArrayOut}
                y={yArrayOut}
              />
            </Paper>
          </Grid>

          {/* <Grid item xs={12} className={classes.child}>
            <Paper className={classes.paper}>
              <BarChart metricName={"Requests Per Sec"} />
            </Paper>
          </Grid> */}
        </Grid>
      </div>
      {/* <div>
        Bytes In Array: {JSON.stringify(props.bytesIn.data.result[0].value)}
      </div> */}
      {/* <div>Bytes In Array: {props.bytesIn}</div> */}
      {/* <div>
        Under Replicated partitions:{" "}
        {JSON.stringify(props.underReplicatedPartitions)}
      </div> */}
      {/* <div>
        Under Replicated partitions:{" "}
        {props.underReplicatedPartitions}
      </div> */}
    </>
  );
}

export default connect(mapStateToProps, null)(BrokerDisplay);
