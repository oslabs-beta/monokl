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
      dispatch(fetchConsumerMetrics());
    },
    fetchNetworkMetrics: () => {
      dispatch(fetchNetworkMetrics());
    },
  };
};

function UnderConstruction(props) {
  return (
    <div>
      <h1>This page is currently under construction!</h1>
      <h5> Items: {props.count} </h5>

      <button onClick={props.addCountAction}>Update Count</button>
      <button onClick={props.fetchConsumerMetrics}>make Fetch</button>

      <div> Data point: {JSON.stringify(props.data)} </div>
    </div>
  );
}

// export default UnderConstruction
export default connect(mapStateToProps, mapDistpatchToProps)(UnderConstruction);
