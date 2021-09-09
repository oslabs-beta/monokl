import React from 'react';
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    count: state.mainReducer.count,
  };
};


function UnderConstruction(props) {
  return (
    <div>
      <h1>This page is currently under construction!</h1>
      {/* <h5>Items: {props.count} </h5> */}
    </div>
  )
}

// export default UnderConstruction
export default connect(mapStateToProps, null)(UnderConstruction);