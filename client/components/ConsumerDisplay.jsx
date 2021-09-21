import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
//Material UI - Core
import {Paper, Grid } from "@material-ui/core"
//App Chart Components
import MultipleLineChart from "./charts/MultipleLineChart.jsx";
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

function ConsumerDisplay(props) {
  const classes = useStyles();
  // component state properties for charts x and y axes
  const [xArray50, setXArray] = useState([]);
  const [yArray50, setYArray50] = useState([]);
  const [yArray75, setXArray75] = useState([]);
  const [yArray95, setXArray95] = useState([]);
  const [yArray99, setXArray99] = useState([]);

  //calculate the interval
  let interval = timeFunction(props.connectionTime);

  useEffect(() => {
    fetch(
      `http://localhost:${props.port}/api/v1/query_range?query=kafka_network_requestmetrics_totaltimems{request="FetchConsumer"}&start=${props.connectionTime}&end=${new Date().toISOString()}&step=${interval.toString()}s`
    )
    .then((respose) => respose.json())
    .then((res) => {
      // 1. Network Request Metrics Time
      setXArray(res.data.result[0].values.map((data) => {
        let date = new Date(data[0] * 1000);
        return date.toLocaleTimeString('en-GB');
      }))
      setYArray50(res.data.result[0].values.map((data) => Number(data[1])))
      setXArray75(res.data.result[1].values.map((data) => Number(data[1])))
      setXArray95(res.data.result[2].values.map((data) => Number(data[1])))
      setXArray99(res.data.result[4].values.map((data) => Number(data[1])))
    })
    .catch(err => console.log(err));
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={3} className={classes.parent}>
        <Grid item xs={12}>
          Consumer Metrics
        </Grid>
        {/*1. Network Request Metrics Time */}
        <Grid item xs={12} className={classes.child}>
          <Paper className={classes.paper}>
            <MultipleLineChart
              label={[
                "Quantile 50",
                "Quantile 75",
                "Quantile 95",
                "Quantile 99",
              ]}
              metricName={"Fetch Consumer Total Time Ms"}
              xtime={xArray50}
              y50={yArray50}
              y75={yArray75}
              y95={yArray95}
              y99={yArray99}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
export default connect(mapStateToProps, null)(ConsumerDisplay);
