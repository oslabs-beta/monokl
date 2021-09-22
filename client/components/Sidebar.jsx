import React from "react";
import { connect } from "react-redux";
//React Router
import { HashRouter, Switch, Route, Redirect, Link } from "react-router-dom";
//Material UI
import clsx from "clsx";
//Material UI Components - Core
import { Drawer, AppBar, Toolbar, List, CssBaseline, Typography, Divider, IconButton, ListItem, ListItemIcon, ListItemText } from "@material-ui/core"
//Material UI Icons
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ConnectIcon from "@material-ui/icons/SettingsEthernetOutlined";
import AlertIcon from "@material-ui/icons/ErrorOutlineOutlined";
import BrokerIcon from '@mui/icons-material/OpenWithOutlined';
import ProducerIcon from '@mui/icons-material/StoreOutlined';
import ConsumerIcon from '@mui/icons-material/ShoppingBagOutlined';
import NetworkIcon from "@material-ui/icons/NetworkCheckOutlined";
import AlertSettingsIcon from "@material-ui/icons/SettingsApplicationsOutlined";
//Material UI - Styles
import { makeStyles, useTheme } from "@material-ui/core/styles";
//Application Components
import ConnectCluster from "./ConnectCluster.jsx";
import DisconnectCluster from "./DisconnectCluster.jsx";
import BrokerDisplay from "./BrokerDisplay.jsx";
import ProducerDisplay from "./ProducerDisplay.jsx";
import ConsumerDisplay from "./ConsumerDisplay.jsx";
import NetworkDisplay from "./NetworkDisplay.jsx";
import UnderConstruction from "./UnderConstruction.jsx";
//Logo
import Logo from "../images/monokl_white.svg";

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
    flexGrow: "1",
    padding: theme.spacing(3),
    marginTop: "50px",
    minWidth: "380px",
  },
  logo: {
    backgroundSize: "20px 30px",
    marginTop: "8px"
  }
}));

const mapStateToProps = (state) => ({
  port: state.mainReducer.port,
});

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
          <Logo className={classes.logo}/>
            {/* <img src={} width={"auto"} height={"50px"}/> */}
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
            <ListItem button key={"Connection"} component={Link} to="/">
              <ListItemIcon>{<ConnectIcon />}</ListItemIcon>
              <ListItemText primary={"Connection"} />
            </ListItem>
            {(() => {
              if (props.port) {
                return (
                  <>
                    <ListItem
                      button
                      key={"Alerts"}
                      component={Link}
                      to="/alerts"
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
                      <ListItemIcon>{<BrokerIcon />}</ListItemIcon>
                      <ListItemText primary={"Broker Metrics"} />
                    </ListItem>
                    <ListItem
                      button
                      key={"Producer Metrics"}
                      component={Link}
                      to="/producer"
                    >
                      <ListItemIcon>{<ProducerIcon />}</ListItemIcon>
                      <ListItemText primary={"Producer Metrics"} />
                    </ListItem>
                    <ListItem
                      button
                      key={"Consumer Metrics"}
                      component={Link}
                      to="/consumer"
                    >
                      <ListItemIcon>{<ConsumerIcon />}</ListItemIcon>
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
                  </>
                );
              }
            })()}
          </List>
          <Divider />
          {(() => {
            if (props.port) {
              return (
                <>
                  <List className={classes.alertSettings}>
                    <ListItem
                      button
                      key={"Alert Settings"}
                      component={Link}
                      to="/settings"
                    >
                      <ListItemIcon>{<AlertSettingsIcon />}</ListItemIcon>
                      <ListItemText primary={"Alert Settings"} />
                    </ListItem>
                  </List>
                </>
              );
            }
          })()}
        </Drawer>
        <main className={classes.content}>
          <Switch>
            <Route
              exact path="/"
              component={!props.port ? ConnectCluster : DisconnectCluster}
            />
            <Route
              path="/alerts"
              component={props.port ? UnderConstruction : () => <Redirect to="/" />}
            />
            <Route
              path="/broker"
              component={props.port ? BrokerDisplay : () => <Redirect to="/" />}
            />
            <Route
              path="/producer"
              component={props.port ? ProducerDisplay : () => <Redirect to="/" />}
            />
            <Route
              path="/consumer"
              component={props.port ? ConsumerDisplay : () => <Redirect to="/" />}
            />
            <Route
              path="/network"
              component={props.port ? NetworkDisplay : () => <Redirect to="/" />}
            />
            <Route
              path="/settings"
              component={props.port ? UnderConstruction : () => <Redirect to="/" />}
            />
          </Switch>
        </main>
      </HashRouter>
    </div>
  );
}

export default connect(mapStateToProps, null)(Sidebar);
