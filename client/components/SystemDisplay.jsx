import React from 'react';
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
        {/* <Grid item xs={6} className={classes.child}>
          <Paper className={classes.paper}><ScoreCard data={1} metricName={'Active Controllers'}/></Paper>
        </Grid>
        <Grid item xs={6} className={classes.child}>
          <Paper className={classes.paper}><ScoreCard data={12} metricName={'Offline Partition Count'}/></Paper>
        </Grid>
        <Grid item xs={12} className={classes.child}>
          <Paper className={classes.paper}><BarChart metricName={'Connection Count'}/></Paper>
        </Grid> */}
        <Grid item xs={12} className={classes.child}>
          <Paper className={classes.paper}><LineChart metricName={'Response Rate'}/></Paper>
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
