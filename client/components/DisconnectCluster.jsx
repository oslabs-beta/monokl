import React from "react";
import { removePortAction } from "../actions/actions";
import { connect } from "react-redux";
//Material UI - Core
import {Button, Paper} from "@material-ui/core"
//Material UI - Styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    flexGrow: "1",
    marginTop: "140px",
    alignItems: "center",
  },
  paper: {
    padding: theme.spacing(3),
    marginBottom: '8px',
    textAlign: "center",
    color: theme.palette.text.secondary,
  },

  connect: {
    "& > *": {
      margin: theme.spacing(1),
      color: "#537791",
    },
  },
}));

const mapStateToProps = (state) => {
  return {
    port: state.mainReducer.port,
    connectionTime: state.mainReducer.connectionTime
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removePortAction: () => {
      dispatch(removePortAction());
    },
  };
};

function DisconnectCluster(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <h2>Successfully connected to Prometheus on port: {props.port}</h2>
      </Paper>
      <Button
        className={classes.connect}
        variant="contained"
        href="#contained-buttons"
        onClick={(e) => {
          e.preventDefault();
          props.removePortAction();
        }}
      >
        Disconnect
      </Button>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(DisconnectCluster);
