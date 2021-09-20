import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
//Material UI - Core
import {Paper, Grid } from "@material-ui/core"
//Chart Components
import LineChart from "./charts/LineChart.jsx";
import ScoreCard from "./charts/ScoreCard.jsx";
//Time Function
import { timeFunction } from "./timeFunction.js";

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

const mapStateToProps = (state) => {
  return {
    port: state.mainReducer.port,
    connectionTime: state.mainReducer.connectionTime
  };
};

function BrokerDisplay(props) {
  const classes = useStyles();
  // component state properties for each charts x and y axis
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

 //calculate the interval
 let interval = timeFunction(props.connectionTime);

  useEffect(() => {
    //1. Under Replicated Partitions Count (Score Card)
    let underReplicated = fetch(
      `http://localhost:${props.port}/api/v1/query?query=kafka_server_replicamanager_underreplicatedpartitions`
    ).then((respose) => respose.json());
  
    //2. Active Controller Count (Score Card)
    let activeController = fetch(
      `http://localhost:${props.port}/api/v1/query?query=kafka_controller_kafkacontroller_activecontrollercount`
    ).then((respose) => respose.json());
  
    //3. Offline Partitions Count (Score Card)
    let offlinePartitions = fetch(
      `http://localhost:${props.port}/api/v1/query?query=kafka_controller_kafkacontroller_offlinepartitionscount`
    ).then((respose) => respose.json());
  
    //4. Leader Election Rate and Time Ms
    let leaderElectionRateMs = fetch(
      `http://localhost:${props.port}/api/v1/query_range?query=kafka_controller_controllerstats_leaderelectionrateandtimems_count&start=${props.connectionTime}&end=${new Date().toISOString()}&step=${interval.toString()}s`
    ).then((respose) => respose.json());
  
    //5. Fetch Consumer Total Time
    let fetchConsumerTime = fetch(
      `http://localhost:${props.port}/api/v1/query_range?query=kafka_network_requestmetrics_totaltimems{request="FetchConsumer"}&start=${props.connectionTime}&end=${new Date().toISOString()}&step=${interval.toString()}s`
    ).then((respose) => respose.json());
  
    //6. Purgatory Size
    let purgatorySizeFetch = fetch(
      `http://localhost:${props.port}/api/v1/query_range?query=kafka_server_delayedoperationpurgatory_purgatorysize{delayedOperation="Fetch"}&start=${props.connectionTime}&end=${new Date().toISOString()}&step=${interval.toString()}s`
    ).then((respose) => respose.json());
  
    //7. Bytes In Total (Range)
    let bytesIn = fetch(
      `http://localhost:${props.port}/api/v1/query_range?query=kafka_server_brokertopicmetrics_bytesin_total&start=${props.connectionTime}&end=${new Date().toISOString()}&step=${interval.toString()}s`
    ).then((respose) => respose.json());
    //8. Bytes Out Total (Range)
    let bytesOut = fetch(
      `http://localhost:${props.port}/api/v1/query_range?query=kafka_server_brokertopicmetrics_bytesout_total&start=${props.connectionTime}&end=${new Date().toISOString()}&step=${interval.toString()}s`
    ).then((respose) => respose.json());

    Promise.all([underReplicated, activeController, offlinePartitions, leaderElectionRateMs, fetchConsumerTime, purgatorySizeFetch, bytesIn, bytesOut])
      .then((allData) => {
        //1. Under Replicated Partitions Chart
        setURP(allData[0].data.result[0].value[1])
        
        //2. Active Controller Count Chart
        setActiveController(allData[1].data.result[0].value[1])
        
        //3. Offline Partitions Count Chart
        setOfflinePartitions(allData[2].data.result[0].value[1])
        
        //4. Leader Election Rate Ms Chart
        setXArrayLeader(allData[3].data.result[0].values.map((data) => {
          console.log('this is data: ', data[0])
          let date = new Date(data[0] * 1000);
          console.log('this is new Date: ', date)
          let time = date.toLocaleTimeString('en-GB');
          console.log('this is time: ', time)
          return time;
        }))
        setYArrayLeader(allData[3].data.result[0].values.map((data) => Number(data[1])))
        
        //5. Fetch Consumer Time Chart
        setXArrayTTFetch(allData[4].data.result[0].values.map((data) => {
          let date = new Date(data[0]);
          return date.getTime();
        }));
        setYArrayTTFetch(allData[4].data.result[0].values.map((data) => Number(data[1])));

        //6. Purgatory Size Chart
        setXArrayPurg(allData[5].data.result[0].values.map((data) => {
          let date = new Date(data[0]);
          return date.getTime();
        }));
        setYArrayPurg(allData[5].data.result[0].values.map((data) => Number(data[1])));

        //7. Bytes In Chart
        setXArrayIn(allData[6].data.result[0].values.map((data) => {
          let date = new Date(data[0]);
          return date.getTime();
        }));
        setYArrayIn(allData[6].data.result[0].values.map((data) => Number(data[1])));

        //8. Bytes Out Chart
        setXArrayOut(allData[7].data.result[0].values.map((data) => {
          let date = new Date(data[0]);
          return date.getTime();
        }));
        setYArrayOut(allData[7].data.result[0].values.map((data) => Number(data[1])));
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={3} className={classes.parent}>
          <Grid item xs={12}>
            Broker Metrics
          </Grid>
          {/* 1. Under Replicated Partitions */}
          <Grid item xs={4} className={classes.child}>
            <Paper className={classes.paper}>
              <ScoreCard
                data={underReplicatedPartitions}
                metricName={"Under Replicated Partitions"}
              />
            </Paper>
          </Grid>
          {/* 2. Active Controller Count */}
          <Grid item xs={4} className={classes.child}>
            <Paper className={classes.paper}>
              <ScoreCard
                data={activeControllerCount}
                metricName={"Active Controller Count"}
              />
            </Paper>
          </Grid>
          {/* 3. Offline Partition Count */}
          <Grid item xs={4} className={classes.child}>
            <Paper className={classes.paper}>
              <ScoreCard
                data={offlinePartitions}
                metricName={"Offline Partition Count"}
              />
            </Paper>
          </Grid>
          {/* 4. Leader Election Rate and Time Ms */}
          <Grid item xs={12} className={classes.child}>
            <Paper className={classes.paper}>
              <LineChart
                metricName={"Leader Election Rate and Time Ms"}
                label={'Rate per Millisecond'}
                x={xArrayLeader}
                y={yArrayLeader}
              />
            </Paper>
          </Grid>
          {/* 5. Fetch Consumer Time - 50th quantile*/}
          <Grid item xs={12} className={classes.child}>
            <Paper className={classes.paper}>
              <LineChart
                metricName={"Fetch Consumer Request Time Ms"}
                label={'Rate per Millisecond'}
                x={xArrayTTFetch}
                y={yArrayTTFetch}
              />
            </Paper>
          </Grid>
          {/* 6. Purgatory Size */}
          <Grid item xs={12} className={classes.child}>
            <Paper className={classes.paper}>
              <LineChart
                metricName={"Fetch Request Purgatory Size"}
                label={'Rate per Millisecond'}
                x={xArrayPurg}
                y={yArrayPurg}
              />
            </Paper>
          </Grid>
          {/* 7. Bytes In */}
          <Grid item xs={6} className={classes.child}>
            <Paper className={classes.paper}>
              <LineChart
                metricName={"Bytes In Per Sec"}
                label={'Rate per Second'}
                x={xArrayIn}
                y={yArrayIn}
              />
            </Paper>
          </Grid>
          {/* 8. Bytes Out */}
          <Grid item xs={6} className={classes.child}>
            <Paper className={classes.paper}>
              <LineChart
                metricName={"Bytes Out Per Sec"}
                label={'Rate per Second'}
                x={xArrayOut}
                y={yArrayOut}
              />
            </Paper>
          </Grid> 
        </Grid>
      </div>
    </>
  );
}

export default connect(mapStateToProps, null)(BrokerDisplay);
