import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LineChart from "./charts/LineChart.jsx";
import ScoreCard from "./charts/ScoreCard.jsx";
import { connect } from "react-redux";
import MultipleLineChart from "./charts/MultipleLineChart.jsx";

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
    data: state.mainReducer.data,
    totalTimeFetchConsumer: state.mainReducer.totalTimeFetchConsumer,
  };
};

function ConsumerDisplay(props) {
  console.log("props.totalTimeFetchConsumer : ", props.totalTimeFetchConsumer);

  const xArray50 = props.totalTimeFetchConsumer[0].values.map((data) => {
    let date = new Date(data[0]);
    return date.getTime();
  });
  const yArray50 = props.totalTimeFetchConsumer[0].values.map((data) =>
    Number(data[1])
  );
  const yArray75 = props.totalTimeFetchConsumer[1].values.map((data) =>
    Number(data[1])
  );
  const yArray95 = props.totalTimeFetchConsumer[2].values.map((data) =>
    Number(data[1])
  );
  const yArray99 = props.totalTimeFetchConsumer[4].values.map((data) =>
    Number(data[1])
  );

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3} className={classes.parent}>
        <Grid item xs={12}>
          Consumer Metrics
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
              metricName={"Total Time ms Consumer"}
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
