import React from "react";
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
    idlePercent: state.mainReducer.idlePercent,
  };
};

function NetworkDisplay(props) {
  console.log("Props.Idle Percent", props.idlePercent);

  //totalProducerRequest
  const xArrayIdle = props.idlePercent.map((data) => {
    let date = new Date(data[0]);
    return date.getTime();
  });
  const yArrayIdle = props.idlePercent.map((data) => Number(data[1]));

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

export default connect(mapStateToProps, null)(NetworkDisplay);
