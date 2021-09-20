import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
//Material UI - Core
import {Paper, Grid } from "@material-ui/core"
//Material UI - Styles
import { makeStyles } from "@material-ui/core/styles";
//Application Chart Components 
import LineChart from "./charts/LineChart.jsx";
import MultipleLineChart from "./charts/MultipleLineChart.jsx";
import ScoreCard from "./charts/ScoreCard.jsx";



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

//use a mapstatetoprops to pass data to both line charts
const mapStateToProps = (state) => {
  return {
    port: state.mainReducer.port,
    connectionTime: state.mainReducer.connectionTime
  };
};

function ProducerDisplay(props) {
  const classes = useStyles();
  // component state properties for each charts x and y axis
  const [xArray50, setXArray] = useState([]);
  const [yArray50, setYArray50] = useState([]);
  const [yArray75, setYArray75] = useState([]);
  const [yArray95, setYArray95] = useState([]);
  const [yArray99, setYArray99] = useState([]);
  const [xArrayTotalProducer, setXArrayTotalProducer] = useState([]);
  const [yArrayTotalProducer, setYArrayTotalProducer] = useState([]);
  const [xFailedProducerRequest, setXArrayFailedProducerRequest] = useState([]);
  const [yFailedProducerRequest, setYArrayFailedProducerRequest] = useState([]);

  useEffect(() => {
    //1. Total Time for Producer Requests
    let totalTimeMs = fetch(
      `http://localhost:${props.port}/api/v1/query_range?query=kafka_network_requestmetrics_totaltimems{request="Produce"}&start=${props.connectionTime}&end=${new Date().toISOString()}&step=60s`
    ).then((respose) => respose.json());
  
    //2. Total Producer Requests= (Aggregate)
    let producerReqsTotal = fetch(
      `http://localhost:${props.port}/api/v1/query_range?query=kafka_server_brokertopicmetrics_totalproducerequests_total&start=${props.connectionTime}&end=${new Date().toISOString()}&step=60s`
    ).then((respose) => respose.json());
  
    //3. Failed Producer Requests (Aggregate)
    let failedProducerReqs = fetch(
      `http://localhost:${props.port}/api/v1/query_range?query=kafka_server_brokertopicmetrics_failedproducerequests_total&start=${props.connectionTime}&end=${new Date().toISOString()}&step=60s`
    ).then((respose) => respose.json());
  
    Promise.all([totalTimeMs, producerReqsTotal, failedProducerReqs])
      .then((allData) => {
        //1. Total Time in Ms for Producer Requests
        setXArray(allData[0].data.result[0].values.map((data) => {
          let date = new Date(data[0]);
          return date.getTime();
        }))
        setYArray50(allData[0].data.result[0].values.map((data) => Number(data[1])))
        setYArray75(allData[0].data.result[1].values.map((data) => Number(data[1])))
        setYArray95(allData[0].data.result[2].values.map((data) => Number(data[1])))
        setYArray99(allData[0].data.result[4].values.map((data) => Number(data[1])))
        //2. Total Producer Requests Chart
        setXArrayTotalProducer(allData[1].data.result[0].values.map((data) => {
          let date = new Date(data[0]);
          return date.getTime();
        }))
        setYArrayTotalProducer(allData[1].data.result[0].values.map((data)=> Number(data[1])))
        //3. Failed Producer Requests Chart
        setXArrayFailedProducerRequest(allData[2].data.result[0].values.map((data) => {
          let date = new Date(data[0]);
          return date.getTime();
        }))
        setYArrayFailedProducerRequest(allData[2].data.result[0].values.map((data) => Number(data[1])))
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={3} className={classes.parent}>
        <Grid item xs={12}>
          Producer Metrics
        </Grid>
        {/* 1. Total Time for Producer Requests */}
        <Grid item xs={12} className={classes.child}>
          <Paper className={classes.paper}>
            <MultipleLineChart
              label={[
                "Quantile 50",
                "Quantile 75",
                "Quantile 95",
                "Quantile 99",
              ]}
              metricName={"Total Time ms Produce"}
              xtime={xArray50}
              y50={yArray50}
              y75={yArray75}
              y95={yArray95}
              y99={yArray99}
            />
          </Paper>
        </Grid>
        {/* Total Producer Requests */}
        <Grid item xs={12} className={classes.child}>
          <Paper className={classes.paper}>
            <LineChart
              metricName={"Total Producer Requests (Aggregate)"}
              x={xArrayTotalProducer}
              y={yArrayTotalProducer}
            />
          </Paper>
        </Grid>
        {/* Failed Producer Requests */}
        <Grid item xs={12} className={classes.child}>
          <Paper className={classes.paper}>
            <LineChart
              metricName={"Failed Producer Requests"}
              x={xFailedProducerRequest}
              y={yFailedProducerRequest}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default connect(mapStateToProps, null)(ProducerDisplay);
