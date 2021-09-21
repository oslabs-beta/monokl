import React, { useState } from "react";
import { addPortAction, addConnectionTimeAction } from "../actions/actions";
import { connect } from "react-redux";
//Material UI - Core
import {TextField,Button } from "@material-ui/core"
//Material UI- Styles
import { makeStyles } from "@material-ui/core/styles";
//Application Components
import PortAlert from './PortAlert.jsx';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "150px",
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "35ch",
    },
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPortAction: (userInput) => {
      dispatch(addPortAction(userInput));
    },
    addConnectionTimeAction: (timestamp) => {
      dispatch(addConnectionTimeAction(timestamp));
    }
  };
};

const verifyPort = async (port) => {
  let valid = false;
  const url = `http://localhost:${port}/api/v1/query?query=up`;
  await fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.status === 'success') valid = true;
    })
    .catch(err => console.log(err));
  return valid;
}

function ConnectCluster(props) {
  const classes = useStyles();
  const [attempts, addAttempt] = useState(0);

  return (
    <>
      <h5>Port: {props.port} </h5>
      <form className={classes.root} noValidate autoComplete="off">
        {attempts > 0 ? <PortAlert /> : <></> }
        <TextField
          id="prometheus"
          label="Prometheus Port"
          type="search"
          variant="outlined"
        />
        <Button
          className={classes.connect}
          variant="contained"
          href="#contained-buttons"
          // onClick function to verify port is a prometheus endpoint
          onClick={async (e) => {
            e.preventDefault();
            const userPort = document.getElementById('prometheus').value;
            const verified = await verifyPort(userPort);
            const timestamp = new Date().toISOString();
            if (verified) {
              props.addPortAction(userPort);
              props.addConnectionTimeAction(timestamp);
            }
            else addAttempt(attempts + 1);
          }}
        >
          Connect
        </Button>
      </form>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectCluster);
