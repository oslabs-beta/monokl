import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
//Material UI - Core
import {Paper, Grid } from "@material-ui/core"
//Application Chart Components 
import LineChart from "./charts/LineChart.jsx";
//Time Function
import { timeFunction } from "./timeFunction.js";



const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: 'column',
    flexGrow: "1",
    alignItems: "center",
  },
  title: {
    color: "rgba(0, 0, 0, 0.54)",
    fontSize: "42px",
    fontWeight: "bold",
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

const mapDispatchToProps = (dispatch) => {
  return {
    fetchNetworkMetrics: () => {
      dispatch(fetchNetworkMetrics());
    },
  };
};

function NetworkDisplay(props) {
  const classes = useStyles();
  // component state properties chart x and y axis
  const [xArrayIdle, setXArray] = useState([]);
  const [yArrayIdle, setYArray] = useState([]);

  //calculate the interval
  let interval = timeFunction(props.connectionTime);

  useEffect(() => {
    fetch(
      `http://localhost:${props.port}/api/v1/query_range?query=kafka_network_socketserver_networkprocessoravgidlepercent&start=${props.connectionTime}&end=${new Date().toISOString()}&step=${interval.toString()}s`
    )
    .then((response) => response.json())
    .then((res)=>{
      //1. Network Processor Avg Idle Percentage
      setXArray(res.data.result[0].values.map((data) => {
        let date = new Date(data[0] * 1000);
        return date.toLocaleTimeString('en-GB');
      }))
      setYArray(res.data.result[0].values.map((data) => Number(data[1])))
      console.log('this is x and y array: ', setXArray, setYArray)
    })
    .catch(err => console.log(err))
  }, []);

    return (
      <div className={classes.root}>
        <p className={classes.title}>Network Metrics</p>
        <Grid container spacing={3} className={classes.parent}>
          {/* 1. network Processor Avg Idle Percentage */}
          <Grid item xs={12} className={classes.child}>
            <Paper className={classes.paper}>
              <LineChart
                metricName={"Network Processor"}
                label={"Average Idle Percentage"}
                x={xArrayIdle}
                y={yArrayIdle}
              />
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(NetworkDisplay);
