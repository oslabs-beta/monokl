import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import BarChart from './charts/BarChart.jsx';
import LineChart from './charts/LineChart.jsx';
import ScoreCard from './charts/ScoreCard.jsx';

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

export default function ClusterDisplay() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3} className={classes.parent}>
        <Grid item xs={4} className={classes.child}>
          <Paper className={classes.paper}><ScoreCard data={0} metricName={'Under Replicated Partitions'}/></Paper>
        </Grid>
        <Grid item xs={4} className={classes.child}>
          <Paper className={classes.paper}><ScoreCard data={1} metricName={'Active Controller Count'}/></Paper>
        </Grid>
        <Grid item xs={4} className={classes.child}>
          <Paper className={classes.paper}><ScoreCard data={12} metricName={'Offline Partition Count'}/></Paper>
        </Grid>
        <Grid item xs={12} className={classes.child}>
          <Paper className={classes.paper}><LineChart metricName={'Leader Election Rate and Time Ms'}/></Paper>
        </Grid>
        <Grid item xs={12} className={classes.child}>
          <Paper className={classes.paper}><LineChart metricName={'Total Time Ms'}/></Paper>
        </Grid>
        <Grid item xs={12} className={classes.child}>
          <Paper className={classes.paper}><BarChart metricName={'Purgatory Size'}/></Paper>
        </Grid>
        <Grid item xs={6} className={classes.child}>
          <Paper className={classes.paper}><LineChart metricName={'Byes In Per Sec'}/></Paper>
        </Grid>
        <Grid item xs={6} className={classes.child}>
          <Paper className={classes.paper}><LineChart metricName={'Bytes Out Per Sec'}/></Paper>
        </Grid>
        <Grid item xs={12} className={classes.child}>
          <Paper className={classes.paper}><BarChart metricName={'Requests Per Sec'}/></Paper>
        </Grid>
      </Grid>
    </div>
  );
}
