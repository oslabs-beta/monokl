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
    bytesIn: state.mainReducer.bytesIn,
  };
};

function BrokerDisplay(props) {
  const classes = useStyles();
  console.log(
    "props.leaderElectionRateAndTimeMs",
    props.leaderElectionRateAndTimeMs
  );

  const xArray = props.bytesIn.map((data) => {
    let date = new Date(data[0]);
    return date.getTime();
  });
  const yArray = props.bytesIn.map((data) => Number(data[1]));
  // console.log("X ", xArray);
  // console.log("Y ", yArray);

  const xArrayLeader = props.leaderElectionRateAndTimeMs.map((data) => {
    let date = new Date(data[0]);
    return date.getTime();
  });
  const yArrayLeader = props.leaderElectionRateAndTimeMs.map((data) =>
    Number(data[1])
  );

  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={3} className={classes.parent}>
          <Grid item xs={12}>
            Broker Metrics
          </Grid>

          <Grid item xs={4} className={classes.child}>
            <Paper className={classes.paper}>
              <ScoreCard
                data={props.underReplicatedPartitions}
                metricName={"Under Replicated Partitions"}
              />
            </Paper>
          </Grid>
          <Grid item xs={4} className={classes.child}>
            <Paper className={classes.paper}>
              <ScoreCard
                data={props.activeControllerCount}
                metricName={"Active Controller Count"}
              />
            </Paper>
          </Grid>
          <Grid item xs={4} className={classes.child}>
            <Paper className={classes.paper}>
              <ScoreCard
                data={props.offlinePartitionsCount}
                metricName={"Offline Partition Count"}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} className={classes.child}>
            <Paper className={classes.paper}>
              <LineChart
                metricName={"Leader Election Rate and Time Ms"}
                x={xArrayLeader}
                y={yArrayLeader}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} className={classes.child}>
            <Paper className={classes.paper}>
              <LineChart metricName={"Total Time Ms"} />
            </Paper>
          </Grid>
          <Grid item xs={12} className={classes.child}>
            <Paper className={classes.paper}>
              <BarChart metricName={"Purgatory Size"} />
            </Paper>
          </Grid>
          <Grid item xs={6} className={classes.child}>
            <Paper className={classes.paper}>
              <LineChart metricName={"Byes In Per Sec"} x={xArray} y={yArray} />
            </Paper>
          </Grid>
          <Grid item xs={6} className={classes.child}>
            <Paper className={classes.paper}>
              <LineChart metricName={"Bytes Out Per Sec"} />
            </Paper>
          </Grid>
          <Grid item xs={12} className={classes.child}>
            <Paper className={classes.paper}>
              <BarChart metricName={"Requests Per Sec"} />
            </Paper>
          </Grid>
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
