import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import BarChart from './charts/BarChart.jsx';
import LineChart from './charts/LineChart.jsx';
import MultipleLineChart from './charts/MultipleLineChart.jsx';
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

  console.log("props.responseRate :" , props.responseRate)

  const classes = useStyles();
  // get the y-axis from first element (metric line)
  const xAxis = props.responseRate[0].values.map((data) => {
    let date = new Date(data[1]);
    return date.getTime();
  })
  // get the Fetch Consumer x-axis 50th
  const resProduce1 = props.responseRate[0].values.map((data) => Number(data[0]));
  // get the Fetch x-axis 98th
  const resProduce2 = props.responseRate[1].values.map((data) => Number(data[0]))
  
  // console.log('fetchConsumer axis: ', resFetch)
  // const resProduce = props.responseRate.map((data) => {
    
  // })

  // const resOffsetCommit = props.responseRate.map((data) => {
    
  // })
  // const yArray = props.bytesIn.map((data) => Number(data[1]));
  // console.log("X ", xArray);
  // console.log("Y ", yArray);
  console.log('this is props.responseRate from within producerDisplay comp: ', props.responseRate)

  return (
    <div className={classes.root}>
      <Grid container spacing={3} className={classes.parent}>

        <Grid item xs={12}>Producer Metrics</Grid>

        <Grid item xs={12} className={classes.child}>
          <Paper className={classes.paper}><MultipleLineChart y1={resProduce1} y2={resProduce2} x={xAxis} label={['Quantile 50', 'Quantile 98', 'Produce', 'Offset Commit']}metricName={'Response Rate'}/></Paper>
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