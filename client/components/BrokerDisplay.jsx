import React, { useState } from "react";
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
    data: state.mainReducer.data,
    underReplicatedPartitions: state.mainReducer.underReplicatedPartitions,
    activeControllerCount: state.mainReducer.activeControllerCount,
    offlinePartitionsCount: state.mainReducer.offlinePartitionsCount,
    leaderElectionRateAndTimeMs: state.mainReducer.leaderElectionRateAndTimeMs,
    purgatorySize: state.mainReducer.purgatorySize,
    totalTimeMS: state.mainReducer.totalTimeMS,
    bytesIn: state.mainReducer.bytesIn,
    bytesOut: state.mainReducer.bytesOut,
  };
};

function BrokerDisplay(props) {
  const classes = useStyles();
  // console.log(
  //   "props.leaderElectionRateAndTimeMs",
  //   props.totalTimeMS.data.result[0].values
  // );
  console.log("props.purgatorySize", props.purgatorySize);

  //Leader Election Rate
  const xArrayLeader = props.leaderElectionRateAndTimeMs.map((data) => {
    let date = new Date(data[0]);
    return date.getTime();
  });
  const yArrayLeader = props.leaderElectionRateAndTimeMs.map((data) =>
    Number(data[1])
  );
  //Total Time Fetch
  const xArrayTTFetch = props.totalTimeMS.data.result[0].values.map((data) => {
    let date = new Date(data[0]);
    return date.getTime();
  });
  const yArrayTTFetch = props.totalTimeMS.data.result[0].values.map((data) =>
    Number(data[1])
  );

  //Purgatory Fetch
  const xArrayPurg = props.bytesIn.map((data) => {
    let date = new Date(data[0]);
    return date.getTime();
  });
  const yArrayPurg = props.bytesIn.map((data) => Number(data[1]));

  //Bytes In
  const xArray = props.purgatorySize.map((data) => {
    let date = new Date(data[0]);
    return date.getTime();
  });
  const yArray = props.purgatorySize.map((data) => Number(data[1]));

  //bytesOut
  const xArrayOut = props.bytesOut.map((data) => {
    let date = new Date(data[0]);
    return date.getTime();
  });
  const yArrayOut = props.bytesOut.map((data) => Number(data[1]));

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
                data={props.underReplicatedPartitions}
                metricName={"Under Replicated Partitions"}
              />
            </Paper>
          </Grid>
          {/* Metric 1: "Active Controller Count" */}
          <Grid item xs={4} className={classes.child}>
            <Paper className={classes.paper}>
              <ScoreCard
                data={props.activeControllerCount}
                metricName={"Active Controller Count"}
              />
            </Paper>
          </Grid>
          {/* Metric 2: "Offline Partition Count" */}
          <Grid item xs={4} className={classes.child}>
            <Paper className={classes.paper}>
              <ScoreCard
                data={props.offlinePartitionsCount}
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
                x={xArray}
                y={yArray}
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
