// import React from "react";
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { addPortAction, addConnectionTimeAction } from "../actions/actions";
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

const mapDistpatchToProps = (dispatch) => {
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
      console.log('res data -> ', data);
      if (data.status === 'success') valid = true;
      console.log('promise valid -> ', valid);
    })
    .catch(err => console.log(err));
  return valid;
}

//component
function ConnectCluster(props) {
  const classes = useStyles();
  const [attempts, addAttempt] = useState(0);

  return (
    <>
      <h5>Port: {props.port} </h5>
      <form className={classes.root} noValidate autoComplete="off">
        {/* <TextField
          id="broker"
          label="Broker Port"
          type="search"
          variant="outlined"
        /> */}
        {/* {attempts > 0 ? <TextField id="prometheus" label="Prometheus Port" type="search" variant="outlined"/> : <Button />} */}
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
          // color="#537791"
          href="#contained-buttons"
          onClick={async (e) => {
            e.preventDefault();
            const userPort = document.getElementById('prometheus').value;
            const verified = await verifyPort(userPort);
            const timestamp = new Date().toISOString();
            console.log('on click -> ', verified);
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

// export default ConnectCluster;
export default connect(mapStateToProps, mapDistpatchToProps)(ConnectCluster);
