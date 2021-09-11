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
          color="#537791"
          href="#contained-buttons"
          onClick={(ele) => {
            ele.preventDefault();
            const userPort = document.getElementById("exporter").value;
            props.addPortAction(userPort);
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

//Include click handler for the button, once clicked, we update our state.
//button will have onclick Handler
//in redux we need state property that is port, start- empty string
//onclick handler, is gonna have a prebuilt url string
//when button is clicked, we take the user input, concat to prebuilt url, then send fetch request
//

//change the way the component is exporting
//import connect from redux
//update the exporting statement to include mapdistpatchtoprops
//actually write the function up above.
