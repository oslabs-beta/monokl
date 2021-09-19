import React, { useEffect, useState } from "react";
import { fetchNetworkMetrics } from "../actions/actions.js";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import BarChart from "./charts/BarChart.jsx";
import LineChart from "./charts/LineChart.jsx";
import ScoreCard from "./charts/ScoreCard.jsx";
import { connect, useDispatch } from "react-redux";

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

const mapDispatchToProps = (dispatch) => {
  return {
    fetchNetworkMetrics: () => {
      dispatch(fetchNetworkMetrics());
    },
  };
};

// async function NetworkDisplay(props) {
//   console.log("Props.Idle Percent", props.idlePercent);
//   //totalProducerRequest

//     //Average Idle percentage: source
//   let data1 = await fetch(
//     `http://localhost:9090/api/v1/query_range?query=kafka_network_socketserver_networkprocessoravgidlepercent&start=2021-09-18T10:30:00.781Z&end=${new Date().toISOString()}&step=60s`
//   ).then((respose) => respose.json());

//   //CPU usage
//   // let data2 = fetch(
//   //   "http://localhost:9090/api/v1/query?query=process_cpu_seconds_total"
//   // ).then((respose) => respose.json());

//   const idleData = await Promise.all([data1])
//     .then((allData) => {
//       return data1.data.result[0].values
//     })
//     .catch(console.error);


//   const xArrayIdle = idleData.map((data) => {
//     let date = new Date(data[0]);
//     return date.getTime();
//   });
//   const yArrayIdle = idleData.map((data) => Number(data[1]));

//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <Grid container spacing={3} className={classes.parent}>
//         <Grid item xs={12}>
//           Network Metrics
//         </Grid>

//         <Grid item xs={12} className={classes.child}>
//           <Paper className={classes.paper}>
//             <LineChart
//               metricName={"Network processor average idle percent"}
//               x={xArrayIdle}
//               y={yArrayIdle}
//             />
//           </Paper>
//         </Grid>
//       </Grid>
//     </div>
//   );
// }

// function NetworkDisplay(props) {
//   console.log("Props.Idle Percent", props.idlePercent);
//   //totalProducerRequest
//   const [xArrayIdle, setXArray] = useState([]);
//   const [yArrayIdle, setYArray] = useState([]);

//   useEffect(() => {
//     fetch(
//       `http://localhost:9090/api/v1/query_range?query=kafka_network_socketserver_networkprocessoravgidlepercent&start=2021-09-19T17:37:11.716Z&end=${new Date().toISOString()}&step=60s`
//     )
//     .then((respose) => respose.json())
//     .then((res)=>{
//       setXArray(res.data.result[0].values.map((data) => {
//         let date = new Date(data[0]);
//         return date.getTime()})
//       )
//       setYArray(res.data.result[0].values.map((data) => Number(data[1])))
//       console.log('this is x and y array: ', setXArray, setYArray)
//     })
//   }, [fetchNetworkMetrics]);

//   // const yArrayIdle = props.idlePercent.map((data) => Number(data[1]));

//   const classes = useStyles();

//     return (
//       <div className={classes.root}>
//         <Grid container spacing={3} className={classes.parent}>
//           <Grid item xs={12}>
//             Network Metrics
//           </Grid>

//           <Grid item xs={12} className={classes.child}>
//             <Paper className={classes.paper}>
//               <LineChart
//                 metricName={"Network processor average idle percent"}
//                 x={xArrayIdle}
//                 y={yArrayIdle}
//               />
//             </Paper>
//           </Grid>
//         </Grid>
//       </div>
//     );

function NetworkDisplay(props) {
  console.log("Props.Idle Percent", props.idlePercent);
  //totalProducerRequest
  // const dispatch = useDispatch();

  // useEffect(() => {

  //   const loadData = async () => {
  //     await dispatch(fetchNetworkMetrics())
  //   }

  //   loadData();

  //   const xArrayIdle = props.idlePercent.map((data) => {
  //     let date = new Date(data[0]);
  //     return date.getTime()})

  //   const yArrayIdle = props.idlePercent.map((data) => Number(data[1]))
  //   console.log('this is xArrayIdle: ', xArrayIdle)

  // }, [dispatch]);

  const [isFetched, setFetched] = useState(false);

  useEffect(async () => {
    console.log('inside useEffect');
    if (!isFetched) {
      console.log('inside fetch block');
      await props.fetchNetworkMetrics();
      setFetched(true);
    }
  }, []);

  if (!isFetched) return null;

  const xArrayIdle = props.idlePercent.map((data) => {
    let date = new Date(data[0]);
    return date.getTime()})

  const yArrayIdle = props.idlePercent.map((data) => Number(data[1]))
  console.log('this is xArrayIdle: ', xArrayIdle)

  // const yArrayIdle = props.idlePercent.map((data) => Number(data[1]));

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
