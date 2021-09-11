import React from "react";
import { connect } from "react-redux";
import { addCountAction } from "../actions/actions";

const mapStateToProps = (state) => {
  return {
    count: state.mainReducer.count,
  };
};

const mapDistpatchToProps = (dispatch) => {
  return {
    addCountAction: () => {
      dispatch(addCountAction);
    },
  };
};

function UnderConstruction(props) {
  return (
    <div>
      <h1>This page is currently under construction!</h1>
      <h5>Items: {props.count} </h5>
      <button onClick={props.addCountAction}>Update Count</button>
    </div>
  );
}

// export default UnderConstruction
export default connect(mapStateToProps, mapDistpatchToProps)(UnderConstruction);
