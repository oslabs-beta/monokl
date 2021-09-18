import React from "react";
import { connect } from "react-redux";
import {
  addCountAction,
  fetchBrokerMetics,
  fetchProducerMetrics,
  fetchConsumerMetrics,
  fetchNetworkMetrics,
} from "../actions/actions";

const mapStateToProps = (state) => {
  return {
    count: state.mainReducer.count,
    data: state.mainReducer.data,
  };
};

const mapDistpatchToProps = (dispatch) => {
  return {
    addCountAction: () => {
      dispatch(addCountAction);
    },
    fetchBrokerMetics: () => {
      dispatch(fetchBrokerMetics());
    },
    fetchProducerMetrics: () => {
      dispatch(fetchProducerMetrics());
    },
    fetchConsumerMetrics: () => {
      dispatch(fetchConsumerMetricsFetch());
    },
    makeNetworkMetricsFetch: () => {
      dispatch(fetchNetworkMetricsFetch());
    },
  };
};

function UnderConstruction(props) {
  //console.log("Fetch Request: ", JSON.stringify(props.data));
  // let arrayToRender = [];
  // if (props.data) {
  //   props.data.forEach((dataPoint, i) => {
  //     arrayToRender.push(
  //       <div key={`datapoint${i}`}>{JSON.stringify(dataPoint)}</div>
  //     );
  //   });
  // }

  // console.log("Component Data: ", props.data);
  return (
    <div>
      <h1>This page is currently under construction!</h1>
      <h5> Items: {props.count} </h5>

      <button onClick={props.addCountAction}>Update Count</button>
      <button onClick={props.fetchBrokerMetics}>make Fetch</button>
      {/* <div> {arrayToRender} </div> */}
      <div> Data point: {JSON.stringify(props.data)} </div>
    </div>
  );
}

// export default UnderConstruction
export default connect(mapStateToProps, mapDistpatchToProps)(UnderConstruction);
