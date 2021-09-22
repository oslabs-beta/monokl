import React from "react";
import { makeStyles } from "@material-ui/core/styles";

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


export default function UnderConstruction() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <p>Coming soon!</p>
    </div>
  );
};


