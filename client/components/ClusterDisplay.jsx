import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import BarChart from './charts/BarChart.jsx';
import LineChart from './charts/LineChart.jsx';
import ScoreCard from './charts/ScoreCard.jsx';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: '50px',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function ClusterDisplay() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper className={classes.paper}><ScoreCard data={1} metricName={'Active Controllers'}/></Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}><ScoreCard data={12} metricName={'Offline Partition Count'}/></Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}><BarChart metricName={'Connection Count'}/></Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}><LineChart metricName={'Broker Network Throughput'}/></Paper>
        </Grid>
        {/* <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid> */}
      </Grid>
    </div>
  );
}
