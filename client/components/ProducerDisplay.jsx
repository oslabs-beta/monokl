import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import BarChart from './charts/BarChart.jsx';
import LineChart from './charts/LineChart.jsx';
import ScoreCard from './charts/ScoreCard.jsx';
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: '1',
    marginTop: '50px',
    alignItems: 'center'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
}));

//use a mapstatetoprops to pass data to both line charts
const mapStateToProps = (state) => {
  return {
    responseRate: state.mainReducer.responseRate,
    requestRate: state.mainReducer.requestRate,
    outgoingBytes: state.mainReducer.outgoingBytes
  };
};

function ProducerDisplay(props) {
  const classes = useStyles();
  const yAxis = props.responseRate.map((data) => Number(data[1]))

  const resFetchConsumer = props.responseRate.map((data) => Number(data[0]));

  // const resFetch = props.responseRate.map((data) => {

  // })

  // const resProduce = props.responseRate.map((data) => {
    
  // })

  // const resOffsetCommit = props.responseRate.map((data) => {
    
  // })
  // const yArray = props.bytesIn.map((data) => Number(data[1]));
  // console.log("X ", xArray);
  // console.log("Y ", yArray);

  return (
    <div className={classes.root}>
      <Grid container spacing={3} className={classes.parent}>

        <Grid item xs={12}>Producer Metrics</Grid>

        <Grid item xs={12} className={classes.child}>
          <Paper className={classes.paper}><LineChart x={resFetchConsumer} y={yAxis} metricName={'Response Rate'}/></Paper>
        </Grid>
        <Grid item xs={12} className={classes.child}>
          <Paper className={classes.paper}><LineChart metricName={'Request Rate'}/></Paper>
        </Grid>
        <Grid item xs={6} className={classes.child}>
          <Paper className={classes.paper}><LineChart metricName={'Request Latency Average'}/></Paper>
        </Grid>
        <Grid item xs={6} className={classes.child}>
          <Paper className={classes.paper}><LineChart metricName={'Outgoing Byte Rate'}/></Paper>
        </Grid>
        <Grid item xs={12} className={classes.child}>
          <Paper className={classes.paper}><LineChart metricName={'Compression Rate'}/></Paper>
        </Grid>
        <Grid item xs={6} className={classes.child}>
          <Paper className={classes.paper}><LineChart metricName={'I/O Wait Time'}/></Paper>
        </Grid>
        <Grid item xs={6} className={classes.child}>
          <Paper className={classes.paper}><LineChart metricName={'Batch Size'}/></Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default connect(mapStateToProps, null)(ProducerDisplay);