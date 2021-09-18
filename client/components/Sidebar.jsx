import React from "react";
import { HashRouter, Switch, Route, Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ConnectIcon from "@material-ui/icons/SettingsEthernetOutlined";
import AlertIcon from "@material-ui/icons/ErrorOutlineOutlined";
import HealthIcon from "@material-ui/icons/LocalHospitalOutlined";
import SystemIcon from "@material-ui/icons/DvrOutlined";
import NetworkIcon from "@material-ui/icons/NetworkCheckOutlined";
import AlertSettingsIcon from "@material-ui/icons/SettingsApplicationsOutlined";

import ConnectCluster from "./ConnectCluster.jsx";
import DisconnectCluster from "./DisconnectCluster.jsx";
import BrokerDisplay from "./BrokerDisplay.jsx";
import ProducerDisplay from "./ProducerDisplay.jsx";
import ConsumerDisplay from "./ConsumerDisplay.jsx";
import NetworkDisplay from "./NetworkDisplay.jsx";
import UnderConstruction from "./UnderConstruction.jsx";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    minHeight: "100vh",
  },
  appBar: {
    backgroundColor: "#537791",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    backgroundColor: "#537791",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    // backgroundColor: 'lightgreen',
    flexGrow: "1",
    padding: theme.spacing(3),
    marginTop: "50px",
    minWidth: "380px",
  },
  alertSettings: {
    // margin: theme.spacing.unit,
    // position: "fixed",
    // marginBottom: 'auto',
    // bottom: theme.spacing(2),
    // left: theme.spacing(2)
  },
}));

const mapStateToProps = (state) => ({ port: state.mainReducer.port });

function Sidebar(props) {
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
          <Typography variant="h5" noWrap>
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
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button key={"Connect"} component={Link} to="/">
              <ListItemIcon>{<ConnectIcon />}</ListItemIcon>
              <ListItemText primary={"Connect"} />
            </ListItem>
            <ListItem
              button
              key={"Alerts"}
              component={Link}
              to="/alerts"
              onClick={() => {
                console.log("Hello from Alerts menu");
              }}
            >
              <ListItemIcon>{<AlertIcon />}</ListItemIcon>
              <ListItemText primary={"Alerts"} />
            </ListItem>
            <ListItem
              button
              key={"Broker Metrics"}
              component={Link}
              to="/broker"
            >
              <ListItemIcon>{<HealthIcon />}</ListItemIcon>
              <ListItemText primary={"Broker Metrics"} />
            </ListItem>
            <ListItem
              button
              key={"Producer Metrics"}
              component={Link}
              to="/producer"
            >
              <ListItemIcon>{<SystemIcon />}</ListItemIcon>
              <ListItemText primary={"Producer Metrics"} />
            </ListItem>
            <ListItem
              button
              key={"Consumer Metrics"}
              component={Link}
              to="/consumer"
            >
              <ListItemIcon>{<SystemIcon />}</ListItemIcon>
              <ListItemText primary={"Consumer Metrics"} />
            </ListItem>
            <ListItem
              button
              key={"Network Metrics"}
              component={Link}
              to="/network"
            >
              <ListItemIcon>{<NetworkIcon />}</ListItemIcon>
              <ListItemText primary={"Network Metrics"} />
            </ListItem>
          </List>
          <Divider />
          <List className={classes.alertSettings}>
            <ListItem
              button
              key={"Alert Settings"}
              onClick={() => {
                console.log("Hello");
              }}
              component={Link}
              to="/settings"
            >
              <ListItemIcon>{<AlertSettingsIcon />}</ListItemIcon>
              <ListItemText primary={"Alert Settings"} />
            </ListItem>
          </List>
        </Drawer>
        <main className={classes.content}>
          <Switch>
            <Route
              exact
              path="/"
              component={!props.port ? ConnectCluster : DisconnectCluster}
            />
            <Route
              path="/alerts"
              component={
                props.port ? UnderConstruction : () => <Redirect to="/" />
              }
            />
            <Route
              path="/broker"
              component={props.port ? BrokerDisplay : () => <Redirect to="/" />}
            />
            <Route
              path="/producer"
              component={
                props.port ? ProducerDisplay : () => <Redirect to="/" />
              }
            />
            <Route
              path="/consumer"
              component={
                props.port ? ConsumerDisplay : () => <Redirect to="/" />
              }
            />
            <Route
              path="/network"
              component={
                props.port ? NetworkDisplay : () => <Redirect to="/" />
              }
            />
            <Route
              path="/settings"
              component={
                props.port ? UnderConstruction : () => <Redirect to="/" />
              }
            />
          </Switch>
        </main>
      </HashRouter>
    </div>
  );
}

export default connect(mapStateToProps, null)(Sidebar);
