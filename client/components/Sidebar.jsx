import React from 'react';
import { HashRouter, Route, Link } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ConnectIcon from '@material-ui/icons/SettingsEthernetOutlined';
import AlertIcon from '@material-ui/icons/ErrorOutlineOutlined';
import HealthIcon from '@material-ui/icons/LocalHospitalOutlined';
import SystemIcon from '@material-ui/icons/DvrOutlined';
import NetworkIcon from '@material-ui/icons/NetworkCheckOutlined';
import AlertSettingsIcon from '@material-ui/icons/SettingsApplicationsOutlined';

import ConnectCluster from './ConnectCluster.jsx';
import ClusterDisplay from './ClusterDisplay.jsx';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: '50px'
  },
  alertSettings:{
    // margin: theme.spacing.unit,
    // position: "fixed",
    // marginBottom: 'auto',
    // bottom: theme.spacing(2),
    // left: theme.spacing(2)
  }
}));

export default function Sidebar() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Monokl
          </Typography>
        </Toolbar>
      </AppBar>
      <HashRouter>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
          >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider/>
          <List>
            <ListItem button key={'Connect'} component={Link} to="/connect">
              <ListItemIcon>{<ConnectIcon />}</ListItemIcon>
              <ListItemText primary={'Connect'} />
            </ListItem>
            <ListItem button key={'Alerts'} component={Link} to="/alerts">
              <ListItemIcon>{<AlertIcon />}</ListItemIcon>
              <ListItemText primary={'Alerts'} />
            </ListItem>
            <ListItem button key={'Cluster Health'} component={Link} to="/health">
              <ListItemIcon>{<HealthIcon />}</ListItemIcon>
              <ListItemText primary={'Cluster Health'} />
            </ListItem>
            <ListItem button key={'System Metrics'} component={Link} to="/system">
              <ListItemIcon>{<SystemIcon />}</ListItemIcon>
              <ListItemText primary={'System Metrics'} />
            </ListItem>
            <ListItem button key={'Network Metrics'} component={Link} to="/network">
              <ListItemIcon>{<NetworkIcon />}</ListItemIcon>
              <ListItemText primary={'Network Metrics'} />
            </ListItem>
          </List>
          <Divider/>
          <List className={classes.alertSettings}>
            <ListItem button key={'Alert Settings'} component={Link} to="/settings">
              <ListItemIcon>{ <AlertSettingsIcon />}</ListItemIcon>
              <ListItemText primary={'Alert Settings'} />
            </ListItem>
          </List>
        </Drawer>
        <main className={classes.content}>
          <Route exact path="/connect" component={ConnectCluster} />
          <Route exact path="/health" component={ClusterDisplay} />
        </main>
      </HashRouter>
    </div>
  );
}

