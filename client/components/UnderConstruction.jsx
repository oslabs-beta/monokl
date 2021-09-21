import React from "react";
import { connect } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "rgba(0, 0, 0, 0.54)",
    fontSize: "42px",
    fontWeight: "bold",
    marginTop: "185px",
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "35ch",
    },
  }
}));

const mapStateToProps = (state) => {
  return {
    data: state.mainReducer.data,
  };
};

function UnderConstruction(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <p>Coming soon!</p>
    </div>
  );
}

export default connect(mapStateToProps, null)(UnderConstruction);
