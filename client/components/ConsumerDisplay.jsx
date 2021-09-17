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

export default function ConsumerDisplay() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3} className={classes.parent}>

        <Grid item xs={12}>Consumer Metrics</Grid>

        <Grid item xs={12} className={classes.child}>
          <Paper className={classes.paper}><LineChart metricName={'Bytes Consumed Rate'}/></Paper>
        </Grid>
        <Grid item xs={12} className={classes.child}>
          <Paper className={classes.paper}><LineChart metricName={'Records Consumed Rate'}/></Paper>
        </Grid>
        <Grid item xs={12} className={classes.child}>
          <Paper className={classes.paper}><LineChart metricName={'Fetch Rate'}/></Paper>
        </Grid>
        <Grid item xs={6} className={classes.child}>
          <Paper className={classes.paper}><LineChart metricName={'Records Lag'}/></Paper>
        </Grid>
        <Grid item xs={6} className={classes.child}>
          <Paper className={classes.paper}><LineChart metricName={'Records Lag Max'}/></Paper>
        </Grid>
      </Grid>
    </div>
  );
}
