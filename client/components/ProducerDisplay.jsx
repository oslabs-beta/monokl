import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import BarChart from "./charts/BarChart.jsx";
import LineChart from "./charts/LineChart.jsx";
import MultipleLineChart from "./charts/MultipleLineChart.jsx";
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

//use a mapstatetoprops to pass data to both line charts
const mapStateToProps = (state) => {
  return {
    totalTimeProduce: state.mainReducer.totalTimeProduce,
    totalProducerRequest: state.mainReducer.totalProducerRequest,
    failedProducerRequest: state.mainReducer.failedProducerRequest,
  };
};

function ProducerDisplay(props) {
  // console.log("props.totalTimeProduce :", props.totalTimeProduce);
  // console.log("75th object:", props.totalTimeProduce[1].values);

  console.log(" Failed :", props.failedProducerRequest);
  //Total Time MS,{Produce}
  const xArray50 = props.totalTimeProduce[0].values.map((data) => {
    let date = new Date(data[0]);
    return date.getTime();
  });
  const yArray50 = props.totalTimeProduce[0].values.map((data) =>
    Number(data[1])
  );
  const yArray75 = props.totalTimeProduce[1].values.map((data) =>
    Number(data[1])
  );
  const yArray95 = props.totalTimeProduce[2].values.map((data) =>
    Number(data[1])
  );
  const yArray99 = props.totalTimeProduce[4].values.map((data) =>
    Number(data[1])
  );

  //totalProducerRequest
  const xArrayTotalProducer = props.totalProducerRequest.map((data) => {
    let date = new Date(data[0]);
    return date.getTime();
  });
  const yArrayTotalProducer = props.totalProducerRequest.map((data) =>
    Number(data[1])
  );

  //failedProducerRequest

  const xFailedProducerRequest = props.failedProducerRequest.map((data) => {
    let date = new Date(data[0]);
    return date.getTime();
  });
  const yFailedProducerRequest = props.failedProducerRequest.map((data) =>
    Number(data[1])
  );

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3} className={classes.parent}>
        <Grid item xs={12}>
          Producer Metrics
        </Grid>

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
        <Grid item xs={12} className={classes.child}>
          <Paper className={classes.paper}>
            <LineChart
              metricName={"Total Producer Requests (Aggregate)"}
              x={xArrayTotalProducer}
              y={yArrayTotalProducer}
            />
          </Paper>
        </Grid>
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
