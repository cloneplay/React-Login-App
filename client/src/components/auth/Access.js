import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import PermIdentity from "@material-ui/icons/PermIdentity";
import Close from "@material-ui/icons/Close";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import Login from "./Login";
import Register from "./Register";
import Logo from "../../img/1000px-React-icon.png";

import Snackbar from "@material-ui/core/Snackbar";
//Dialog
import Dialog from "@material-ui/core/Dialog";
//import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
//import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

import HowToReg from "@material-ui/icons/HowToReg";
import Create from "@material-ui/icons/Create";
import ArrowBack from "@material-ui/icons/ArrowBack";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  dialog: {
    height: 550,
    width: 400
  },
  dialogHeader: {
    textAlign: "center"
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  closeIcon: {
    float: "right",
    position: "absolute",
    top: 6,
    right: 6,
    fontSize: "smaller"
  },
  root: {
    flexGrow: 1
  },
  flex: {
    flexGrow: 1
  },
  card: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  }
});

class Access extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      snackbarOpen: false,
      isAccessLanding: true,
      isLogin: false,
      isRegister: false
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({
      open: false,
      isLogin: false,
      isAccessLanding: true,
      isRegister: false
    });
  };

  handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ snackbarOpen: false });
  };

  loginClicked = () => {
    this.setState({ isLogin: true, isAccessLanding: false, isRegister: false });
  };

  registerClicked = () => {
    this.setState({ isLogin: false, isAccessLanding: false, isRegister: true });
  };

  handleSuccessAccess = () => {
    this.setState({
      open: false,
      isLogin: false,
      isAccessLanding: true,
      isRegister: false,
      snackbarOpen: true
    });
  };

  backClicked = () => {
    this.setState({
      isLogin: false,
      isAccessLanding: true,
      isRegister: false
    });
  };

  render() {
    let dialogContents = "";
    let dialogTitle = "";
    if (this.state.isAccessLanding) {
      dialogContents = (
        <div className={this.props.classes.dialogHeader}>
          <img src={Logo} alt="Logo" />
          <Button
            variant="outlined"
            color="primary"
            className={this.props.classes.button}
            onClick={this.loginClicked}
          >
            <HowToReg className={this.props.classes.leftIcon} />
            Login
          </Button>
          <Button
            variant="outlined"
            color="primary"
            className={this.props.classes.button}
            onClick={this.registerClicked}
          >
            <Create className={this.props.classes.leftIcon} />
            Register
          </Button>
        </div>
      );
      dialogTitle = (
        <div className={this.props.classes.dialogHeader}>
          <h3>Welcome to ClonePlay</h3>
          <Close
            onClick={this.handleClose}
            className={this.props.classes.closeIcon}
          />
        </div>
      );
    }
    if (this.state.isLogin) {
      dialogContents = <Login handleSuccessLogin={this.handleSuccessAccess} />;
      dialogTitle = (
        <div>
          <Button
            variant="fab"
            mini
            color="primary"
            className={this.props.classes.button}
            onClick={this.backClicked}
          >
            <ArrowBack />
          </Button>
          <span>Login To ClonePlay</span>
          <Close
            onClick={this.handleClose}
            className={this.props.classes.closeIcon}
          />
        </div>
      );
    }
    if (this.state.isRegister) {
      dialogContents = (
        <Register handleSuccessRegister={this.handleSuccessAccess} />
      );
      dialogTitle = (
        <div>
          <Button
            variant="fab"
            mini
            color="primary"
            className={this.props.classes.button}
            onClick={this.backClicked}
          >
            <ArrowBack />
          </Button>
          <span>Register To ClonePlay</span>
          <Close
            onClick={this.handleClose}
            className={this.props.classes.closeIcon}
          />
        </div>
      );
    }

    return (
      <div>
        <Button color="inherit" onClick={this.handleClickOpen}>
          <PermIdentity className={this.props.classes.leftIcon} />
          Login
        </Button>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          open={this.state.snackbarOpen}
          autoHideDuration={3000}
          onClose={this.handleSnackbarClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<h5 id="message-id">Success!!! Check console for object</h5>}
        />
        <Dialog
          open={this.state.open}
          fullScreen={this.props.fullScreen}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <div className={this.props.classes.dialog}>
            <DialogTitle id="alert-dialog-slide-title">
              {dialogTitle}
            </DialogTitle>
            <DialogContent>{dialogContents}</DialogContent>
          </div>
        </Dialog>
      </div>
    );
  }
}

Access.propTypes = {
  classes: PropTypes.object.isRequired,
  fullScreen: PropTypes.bool.isRequired
};

export default withMobileDialog()(withStyles(styles)(Access));
