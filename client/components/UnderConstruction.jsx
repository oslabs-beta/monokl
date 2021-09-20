import React from "react";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    data: state.mainReducer.data,
  };
};

function UnderConstruction(props) {
  return (
    <div>
      <h1>This page is currently under construction!</h1>
    </div>
  );
}

export default connect(mapStateToProps, null)(UnderConstruction);
