import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { addPortAction } from "../actions/actions";

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

  return (
    <>
      <h5>Port: {props.port} </h5>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="broker"
          label="Broker Port"
          type="search"
          variant="outlined"
        />
        <TextField
          id="exporter"
          label="Exporter Port"
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
            const userPort = document.getElementById('exporter').value;
            const verified = await verifyPort(userPort);
            console.log('on click -> ', verified);
            if (verified) props.addPortAction(userPort);
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
