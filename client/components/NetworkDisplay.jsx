import React, { useEffect, useState } from "react";
import { fetchNetworkMetrics } from "../actions/actions.js";
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

  const [xArrayIdle, setXArray] = useState([]);
  const [yArrayIdle, setYArray] = useState([]);

  useEffect(() => {
    fetch(
      `http://localhost:${props.port}/api/v1/query_range?query=kafka_network_socketserver_networkprocessoravgidlepercent&start=${props.connectionTime}&end=${new Date().toISOString()}&step=60s`
    )
    .then((response) => response.json())
    .then((res)=>{
      setXArray(res.data.result[0].values.map((data) => {
        let date = new Date(data[0]);
        return date.getTime()})
      )
      setYArray(res.data.result[0].values.map((data) => Number(data[1])))
      console.log('this is x and y array: ', setXArray, setYArray)
    })
    .catch(console.error)
  }, []);

  const classes = useStyles();

    return (
      <div className={classes.root}>
        <Grid container spacing={3} className={classes.parent}>
          <Grid item xs={12}>
            Network Metrics
          </Grid>

          <Grid item xs={12} className={classes.child}>
            <Paper className={classes.paper}>
              <LineChart
                metricName={"Network processor average idle percent"}
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
