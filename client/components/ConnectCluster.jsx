import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';


// const useStyles = makeStyles((theme) => ({
//   connect: {
//     '& > *': {
//       margin: theme.spacing(1),
//     },
//   },
// }));

// export default function ContainedButtons() {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//     </div>
//   );
// }

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '200px',
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '35ch',
    },
  },
  connect: {
    '& > *': {
      margin: theme.spacing(1),
    },
  }
}));

export default function ConnectCluster() {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id="broker" label="Broker Port" type="search" variant="outlined" />
      <TextField id="exporter" label="Exporter Port" type="search" variant="outlined" />
      <Button className={classes.connect} variant="contained" color="primary" href="#contained-buttons">
        Connect
      </Button>
    </form>
  );
}
